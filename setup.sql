-- Create a table for users
create table users (
  id uuid references auth.users not null primary key,
  email text not null,
  password text not null
);

-- Create a table for patients
create table patients (
  id uuid not null primary key,
  userId uuid not null references users(id),
  firstName text,
  lastName text,
  age integer,
  state text,
  city text,
  zip text
);

-- Create a table for clinicians
create table clinicians (
  id uuid not null primary key,
  userId uuid references users(id),
  firstName text,
  lastName text,
  employer text,
  state text,
  city text,
  zip text
);

-- Create a table for admins
create table admins (
  id uuid not null primary key,
  userId uuid not null references users(id)
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
  sender uuid references users(id),
  receiver uuid references users(id),
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
  assignDate timestamp not null,
  dueDate timestamp,
  completed boolean not null,
  completeDate timestamp not null
);

-- Create a table for clinic members
create table clinicMembers (
  id uuid not null primary key,
  patientId uuid references patients(id),
  clinicId uuid references clinics(id),
  diagnosis text not null,
  joinDate timestamp not null
);

-- Create a table for milestones
create table milestones (
  id uuid not null primary key,
  assigner uuid references clinicians(id),
  patient uuid references patients(id),
  clinicId uuid references clinics(id),
  name text not null,
  description text
);

-- Set up Row Level Security (RLS)
-- See https://supabase.com/docs/guides/auth/row-level-security for more details.
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile." on profiles
  for update using (auth.uid() = id);

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- See https://supabase.com/docs/guides/auth/managing-user-data#using-triggers for more details.
create function public.handle_new_user()
returns trigger as $$
declare username text;
begin
  select substring(new.email from '(.*)@') into username;
  insert into public.profiles (id, email, display_name, biography)
  values (new.id, new.email, username, '');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- -- Enable Row Level Security for patients, clinicians, admins, clinics, messages, tasks, clinicMembers, and milestones tables
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

-- -- Allow clinicians to view patient data
-- CREATE POLICY "Clinicians can view patient data."
-- AS PERMISSIVE
-- FOR SELECT
-- USING (auth.uid() = userId OR (auth.has_role('clinician') AND auth.uid() = (SELECT userId FROM patients WHERE id = current.id)));

-- -- Allow clinicians to create/edit/delete/view their clinics
-- CREATE POLICY "Clinicians can create/ edit/ delete their clinics."
-- AS PERMISSIVE
-- FOR INSERT, UPDATE, DELETE, SELECT
-- USING (auth.uid() = userId AND current.id = (SELECT clinicId FROM clinics WHERE id = current.id));

-- -- Allow users to view/insert their messages (whether they are sender or receiver)
-- CREATE POLICY "Users can view/ insert their messages."
-- AS PERMISSIVE
-- FOR SELECT, INSERT
-- USING (auth.uid() = sender OR auth.uid() = receiver);

-- -- Allow patients to view/edit tasks they have been assigned
-- CREATE POLICY "Patients can view/ edit assigned tasks."
-- AS PERMISSIVE
-- FOR SELECT, UPDATE
-- USING (auth.uid() = userId);

-- -- Allow clinicians to create/edit/delete/view tasks they have assigned
-- CREATE POLICY "Clinicians can create/ edit/ delete/ view assigned tasks."
-- AS PERMISSIVE
-- FOR INSERT, UPDATE, DELETE, SELECT
-- USING (auth.uid() = assigner);

-- -- Allow patients to view milestones they have been assigned
-- CREATE POLICY "Patients can view milestones they have been assigned"
-- AS PERMISSIVE
-- FOR SELECT
-- USING (auth.uid() = userId);

-- -- Allow clinicians to create/edit/delete/view milestones they have assigned
-- CREATE POLICY "Clinicians can create/ edit/ delte/ view assign milestones."
-- AS PERMISSIVE
-- FOR INSERT, UPDATE, DELETE, SELECT
-- USING (auth.uid() = assigner);

-- -- Create policy for clinic members to view clinics they belong to
-- CREATE POLICY clinic_members_access_policy
-- AS PERMISSIVE
-- FOR SELECT
-- USING (auth.uid() = userId OR auth.has_role('clinician'));

-- -- Apply RLS policies to each respective table
-- ALTER TABLE patients ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinicians ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinics ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE clinicMembers ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;