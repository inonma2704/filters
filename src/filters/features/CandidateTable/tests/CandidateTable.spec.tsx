import { render, screen } from '@testing-library/react'
import { Candidate } from '@/filters/types'
import CandidateTable from '../CandidateTable'

const sampleCandidates: Candidate[] = [
  { id: 1, name: 'Alice', domain: 'finance', position: 'Analyst', status: 'new', experience: 2 },
  { id: 2, name: 'Bob', domain: 'technology', position: 'Developer', status: 'interview', experience: 5 },
]

describe('CandidateTable', () => {
  it('renders candidates correctly', () => {
    render(<CandidateTable candidates={sampleCandidates} isFetching={false} />)

    // Check if candidate names are in the table
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('Bob')).toBeInTheDocument()
  })

  it('shows loading spinner when isFetching is true', () => {
    render(<CandidateTable candidates={[]} isFetching={true} />)

    // CircularProgress should be in the document
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('renders empty table when candidates is null', () => {
    render(<CandidateTable candidates={null} isFetching={false} />)

    // Table renders, but no rows
    expect(screen.queryByRole('row', { name: /Alice/i })).not.toBeInTheDocument()
  })
})
