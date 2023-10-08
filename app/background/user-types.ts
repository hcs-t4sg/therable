// TODO: replace with Supabase typing

interface Patient {
  id: string,
  userId: string,
  firstName?: string,
  lastName?: string,
  age?: number,
  state?: string,
  city?: string,
  zip?: string
}

interface Clinician {
  id: string,
  userId: string,
  firstName?: string,
  lastName?: string,
  employer?: string,
  state?: string,
  city?: string,
  zip?: string
}

export { Patient, Clinician }
