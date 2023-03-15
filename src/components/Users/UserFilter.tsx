import { Add, Refresh } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'

import { usePagination } from '../Providers/PaginationProvider'
import { UserSearch } from './UserSearch'

interface Props {
  onAdd?: () => void
}

export const UserFilter: React.FC<Props> = ({ onAdd }) => {
  const { refreshData } = usePagination()

  return (
    <Grid container justifyContent="flex-end" alignItems="center">
      <Grid item xs={12}>
        <Grid container justifyContent="flex-end" alignItems="center" pb={1}>
          {onAdd ? (
            <IconButton onClick={onAdd}>
              <Add />
            </IconButton>
          ) : null}
          <IconButton onClick={refreshData}>
            <Refresh />
          </IconButton>
        </Grid>
        <UserSearch />
      </Grid>
    </Grid>
  )
}
