import { Candidate } from '../types'
import { candidates } from './mock/mock'

// eslint-disable-next-line import/no-unused-modules
export type CandidateFilters = Partial<Candidate>

export const getCandidates = async (filters?: CandidateFilters) => {
  await new Promise((resolve) => setTimeout(resolve, 1500)) // Simulate network delay

  let filteredCandidates = candidates

  if (filters?.name) {
    const nameFilter = filters.name
    filteredCandidates = filteredCandidates.filter((candidate) => {
      return candidate.name.toLowerCase().includes(nameFilter.toLowerCase())
    })
  }

  if (filters?.domain) {
    const domainFilter = filters.domain
    filteredCandidates = filteredCandidates.filter((candidate) => {
      return candidate.domain === domainFilter
    })
  }

  if (filters?.status) {
    const statusFilter = filters.status
    filteredCandidates = filteredCandidates.filter((candidate) => {
      return candidate.status === statusFilter
    })
  }

  if (filters?.experience) {
    const experienceFilter = filters.experience
    filteredCandidates = filteredCandidates.filter((candidate) => {
      return candidate.experience >= experienceFilter
    })
  }

  return filteredCandidates
}
