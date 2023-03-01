import { useMemo } from 'react'

import { ArrowRightAlt } from '@mui/icons-material'
import { Button, Grid, Tooltip, Typography } from '@mui/material'

import { PanelWrapper } from '../../../styles'
import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseInfoCard } from './PurchaseInfoCard'
import { SelectCustomerCard } from './SelectCustomerCard'

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
            <SelectCustomerCard />
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseInfoCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" py={2}>
                <Tooltip title="Selecione um cliente para prosseguir" PopperProps={{ hidden: !disableNext }}>
                  <div>
                    <Button onClick={onNext} disabled={disableNext} variant="contained" endIcon={<ArrowRightAlt />}>
                      Avançar
                    </Button>
                  </div>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                {disableNext ? (
                  <Typography align="center" variant="caption" color="red">
                    Selecione o cliente para prosseguir
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
