import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'

export const useCandidateColumns = (): GridColDef[] => {
  return useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1 },
      { field: 'position', headerName: 'Position', flex: 1 },
      { field: 'status', headerName: 'Status', flex: 1 }, // ✅ normal text
      { field: 'experience', headerName: 'Experience (yrs)', type: 'number', flex: 0.5 },
    ],
    [],
  )
}
