import { useCallback } from 'react'

import { Button, Grid, Typography } from '@mui/material'

import { SimpleModal } from '~/components/Common/SimpleModal'
import { deletePriceRule } from '~/services/api/priceRules'

interface Props {
  open?: boolean
  onToggle?: () => void
  id: number
  onRemoveSuccess?: () => void
}

export const RemovePriceRuleModal: React.FC<Props> = ({ onToggle, open = false, id, onRemoveSuccess }) => {
  const handleRemove = useCallback(
    async (removeId: number) => {
      if (removeId) {
        await deletePriceRule(removeId)
        onToggle()
        onRemoveSuccess()
      }
    },
    [onRemoveSuccess, onToggle]
  )

  return (
    <SimpleModal title="Deseja mesmo excluir essa regra?" open={open} onToggle={onToggle}>
      <Grid container direction="column">
        <Grid item pb={4} flex={1}>
          <Typography variant="body1" pl={1} color="red">
            Essa ação é irreversível
          </Typography>
        </Grid>
        <Grid item>
          <Grid container alignItems="center" justifyContent="flex-end">
            <Button onClick={() => handleRemove(id)} color="error">
              Excluir
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </SimpleModal>
  )
}
