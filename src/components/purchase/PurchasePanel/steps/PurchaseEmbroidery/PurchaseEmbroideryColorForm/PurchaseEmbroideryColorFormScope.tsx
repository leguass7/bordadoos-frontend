import { Close } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Scope } from '@unform/core'

import { Field } from '~/components/Form/Field'

interface Props {
  index: number
  id: number
  onRemove?: (id: number, index: number) => void
}

export const PurchaseEmbroideryColorFormScope: React.FC<Props> = ({ index, onRemove, id }) => {
  return (
    <Grid container>
      <Grid item flex={1}>
        <Scope path={`colors[${index}]`}>
          <Grid container>
            <Field name="label" label="Nome da palheta de cores" />
            <Grid item flex={1}>
              <Field
                name="colors"
                label="Digite os números das cores dessa palheta separas por vírgula"
                placeholder="ex: 1928,1923,1935..."
              />
            </Grid>
          </Grid>
        </Scope>
      </Grid>
      <Grid item height="64px">
        <Grid container ml={1} height="100%" alignItems="center" justifyContent="center">
          <Tooltip placement="right" title="Remover cor">
            <IconButton onClick={() => onRemove(id, index)} color="error">
              <Close />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )
}
