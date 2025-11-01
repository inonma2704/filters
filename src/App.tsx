import { useMemo, useState, useCallback } from 'react'
import CandidateTable from './filters/features/CandidateTable/CandidateTable'
import { CandidateFilters, getCandidates } from './filters/api'
import { useFetchCandidates } from './filters/hooks/useFetchCandidates'
import { CandidateFilterToolbar } from './filters/features/CandidateFilterToolbar/CandidateFilterToolbar'
import { Candidate } from './filters/types'

export default function App() {
  const [filters, setFilters] = useState<CandidateFilters>({})

  const memoizedFilters = useMemo(() => filters, [filters])

  const { data: candidates, isFetching, error } = useFetchCandidates(getCandidates, memoizedFilters)

  const handleFiltersChange = useCallback((newFilters: CandidateFilters) => {
    setFilters(newFilters)
  }, [])

  if (error) return <p>{`Error: ${error.message}`}</p>

  return (
    <>
      <CandidateFilterToolbar onChange={handleFiltersChange} />
      <CandidateTable candidates={(candidates ?? []) as Candidate[]} isFetching={isFetching} />
    </>
  )
}
