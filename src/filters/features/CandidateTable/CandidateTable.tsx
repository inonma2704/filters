import { DataGrid } from '@mui/x-data-grid'
import { Box } from '@mui/material'
import { Candidate } from '@/filters/types'
import { useCandidateColumns } from './hooks/useCandidateColumns'

const CandidateTable = ({ candidates }: { candidates: Candidate[] | null }) => {
  const columns = useCandidateColumns()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: 400, width: '100%', minWidth: 600 }}>
      <DataGrid rows={candidates ?? []} columns={columns} disableRowSelectionOnClick hideFooter />
    </Box>
  )
}

export default CandidateTable
