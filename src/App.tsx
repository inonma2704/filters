import { useMemo, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { useFetchCandidates } from './filters/hooks/useFetchCandidates'
import { CandidateFilters, getCandidates } from './filters/api'
import { useCandidateColumns } from './filters/features/CandidateTable/hooks/useCandidateColumns'

export default function App() {
  const [filters] = useState<CandidateFilters>({})
  const columns = useCandidateColumns()

  // Memoize filters to prevent unnecessary rerenders
  const memoizedFilters = useMemo(() => filters, [filters])

  const { data: candidates, isFetching, error } = useFetchCandidates(getCandidates, memoizedFilters)

  if (isFetching) return <p>{'Loading candidates...' satisfies string}</p>
  if (error) return <p>{`Error: ${error.message}`}</p>

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', height: 400, width: '100%', minWidth: 600 }}>
        <DataGrid rows={candidates ?? []} columns={columns} disableRowSelectionOnClick hideFooter />
      </Box>
    </>
  )
}
