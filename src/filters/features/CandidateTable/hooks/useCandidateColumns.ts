import { GridColDef } from '@mui/x-data-grid'
import { useMemo } from 'react'

export const useCandidateColumns = (): GridColDef[] => {
  return useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, sortable: false },
      { field: 'position', headerName: 'Position', flex: 1, sortable: false },
      { field: 'status', headerName: 'Status', flex: 1, sortable: false },
      {
        field: 'experience',
        headerName: 'Experience (yrs)',
        type: 'number',
        flex: 0.5,
        headerAlign: 'left',
        align: 'left',
        sortable: false,
      },
    ],
    [],
  )
}
