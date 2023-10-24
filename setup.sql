-- Create a table for patients
create table patients (
  id uuid not null primary key,
  user_id uuid not null references auth.users(id),
  first_name text,
  last_name text,
  age integer,
  state text,
  city text,
  zip text
);

-- Create a table for clinicians
create table clinicians (
  id uuid not null primary key,
  user_id uuid references auth.users(id),
  first_name text,
  last_name text,
  employer text,
  state text,
  city text,
  zip text
);

-- Create a table for admins
create table admins (
  id uuid not null primary key,
  user_id uuid not null references auth.users(id)
);

-- Create a table for clinics - this was being problematic when putting it into supabse
create table clinics (
  id uuid not null primary key,
  owner uuid references clinicians(id) not null,
  code text not null,
  name text not null
);

-- Create a table for messages
create table messages (
  id uuid not null primary key,
  sender uuid references auth.users(id),
  receiver uuid references auth.users(id),
  message text not null,
  media text
);

-- Create a table for tasks
create table tasks (
  id uuid not null primary key,
  assigner uuid references clinicians(id),
  patient uuid references patients(id),
  name text not null,
  description text,
  media text,
  assign_date timestamp not null,
  due_date timestamp,
  completed boolean not null,
  complete_date timestamp not null
);

-- Create a table for clinic members
create table clinic_members (
  id uuid not null primary key,
  patient_id uuid references patients(id),
  clinic_id uuid references clinics(id),
  diagnosis text not null,
  join_date timestamp not null
);

-- Create a table for milestones
create table milestones (
  id uuid not null primary key,
  assigner uuid references clinicians(id),
  patient uuid references patients(id),
  clinic_id uuid references clinics(id),
  name text not null,
  description text
);

-- -- Set up Row Level Security (RLS)
-- -- See https://supabase.com/docs/guides/auth/row-level-security for more details.

-- Enable Row Level Security for patients, clinicians, admins, clinics, messages, tasks, clinicMembers, and milestones tables
-- ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinicians ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinicMembers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;

-- -- Allow users to view/edit their own data in the patients, clinicians, and admins tables
-- create policy "Users can view their own data." on users
-- for select using (auth.uid() = userId);

-- create policy "Patients can view their own data." on patients
-- for select using (auth.uid() = userId);

-- create policy "Clinicians can view their own data." on patients
-- for select using (auth.uid() = clinicianId);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
DECLARE
    username text;
BEGIN
    SELECT substring(NEW.email from '(.*)@') INTO username;

    INSERT INTO public.profiles (id, email, display_name, biography)
    VALUES (NEW.id, NEW.id, username, '');

    IF NEW.raw_user_meta_data->>'type' = 'patient' THEN
        INSERT INTO public.patients (user_id, first_name, last_name, age, state, city, zip)
        VALUES (NEW.id, NEW.raw_user_meta_data ->>'first_name', NEW.raw_user_meta_data->>'last_name', (NEW.raw_user_meta_data->>'age')::integer, NEW.raw_user_meta_data->>'state', NEW.raw_user_meta_data->>'city', NEW.raw_user_meta_data->>'zipcode');
    ELSIF NEW.raw_user_meta_data->>'type' = 'clinician' THEN
        INSERT INTO public.clinicians (user_id, first_name, last_name, employer, state, city, zip)
        VALUES (NEW.id, NEW.raw_user_meta_data->>'first_name', NEW.raw_user_meta_data->>'last_name', NEW.raw_user_meta_data->>'employer', NEW.raw_user_meta_data->>'state', NEW.raw_user_meta_data->>'city', NEW.raw_user_meta_data->>'zipcode');
    END IF;

    RETURN NEW;
END;
$$ language plpgsql security definer;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();