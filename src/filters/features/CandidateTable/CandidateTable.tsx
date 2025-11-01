import { DataGrid } from '@mui/x-data-grid'
import { Box, CircularProgress } from '@mui/material'
import { Candidate } from '@/filters/types'
import { useCandidateColumns } from './hooks/useCandidateColumns'

interface CandidateTableProps {
  candidates: Candidate[] | null
  isFetching: boolean
}

const CandidateTable: React.FC<CandidateTableProps> = ({ candidates, isFetching }) => {
  const columns = useCandidateColumns()

  return (
    <Box sx={{ position: 'relative', height: 400, width: '100%', minWidth: 600 }}>
      {isFetching ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255,255,255,0.7)',
            zIndex: 1,
          }}
        >
          <CircularProgress />
        </Box>
      ) : null}

      <DataGrid rows={candidates ?? []} columns={columns} disableRowSelectionOnClick hideFooter />
    </Box>
  )
}

export default CandidateTable
