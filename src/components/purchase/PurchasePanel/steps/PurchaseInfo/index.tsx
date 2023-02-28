import { useMemo } from 'react'

import { ArrowRightAlt } from '@mui/icons-material'
import { Button, Card, Grid, Tooltip } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'

import { PanelWrapper } from '../../../styles'
import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseInfoForm } from './PurchaseInfoForm'
import { SelectCustomer } from './SelectCustomer'

interface Props {
  onNext?: () => void
  onSuccess?: () => void
}

export const PurchaseInfo: React.FC<Props> = ({ onNext, onSuccess }) => {
  const { info } = usePurchasePanelContext()

  const disableNext = useMemo(() => {
    return !info?.clientId
  }, [info])

  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <Grid item xs={12} sm={6}>
            <SelectCustomer />
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <Card>
            <CardTitle title="Dados do pedido" divider />
            <Grid item p={2} xs={12}>
              <PurchaseInfoForm onSuccess={onSuccess} />
            </Grid>
          </Card>
        </PanelWrapper>
        <PanelWrapper>
          <Grid container justifyContent="center" alignItems="center" py={2}>
            <Tooltip title="Selecione um cliente para prosseguir" PopperProps={{ hidden: !disableNext }}>
              <div>
                <Button onClick={onNext} disabled={disableNext} variant="contained" endIcon={<ArrowRightAlt />}>
                  Avançar
                </Button>
              </div>
            </Tooltip>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
