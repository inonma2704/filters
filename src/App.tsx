import { useMemo, useState } from 'react'
import { useFetchCandidates } from './filters/hooks/useFetchCandidates'
import { CandidateFilters, getCandidates } from './filters/api'
import CandidateTable from './filters/features/CandidateTable/CandidateTable'
import { Candidate } from './filters/types'

export default function App() {
  const [filters] = useState<CandidateFilters>({})

  // Memoize filters to prevent unnecessary rerenders
  const memoizedFilters = useMemo(() => filters, [filters])

  const { data: candidates, isFetching, error } = useFetchCandidates(getCandidates, memoizedFilters)

  if (isFetching) return <p>{'Loading candidates...' satisfies string}</p>
  if (error) return <p>{`Error: ${error.message}`}</p>

  return (
    <>
      <CandidateTable candidates={(candidates ?? []) as Candidate[]} />
    </>
  )
}
