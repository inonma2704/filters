export type Candidate = {
  id: number
  name: string
  domain: 'finance' | 'technology' | 'marketing'
  position: string
  status: 'new' | 'interview' | 'hired'
  experience: number // in years
}
