import { useCallback, useMemo } from 'react'
import { toast } from 'react-toastify'

import { Button, ButtonGroup, Grid } from '@mui/material'

import { PanelWrapper } from '~/components/purchase/styles'
import { IResponsePurchase } from '~/serverSide/purchases/purchase.dto'
import { postDefault, putDefault } from '~/services/api'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseAdditionalFormCard } from '../PurchaseAdditionals/PurchaseAdditionalFormCard'
import { SelectPurchaseRules } from '../PurchaseAdditionals/SelectPurchaseRules'
import { PurchaseEmbroideryCard } from '../PurchaseEmbroidery/PurchaseEmbroideryCard'
import { PurchaseInfoCard } from '../PurchaseInfo/PurchaseInfoCard'
import { SelectCustomerCard } from '../PurchaseInfo/SelectCustomerCard'

interface Props {
  onPrev?: () => void
  purchaseId?: number
  onSuccess?: () => void
}

export const PurchaseSummary: React.FC<Props> = ({ onPrev, purchaseId, onSuccess }) => {
  const { additionals, info, embroidery, ruleIds } = usePurchasePanelContext()

  const purchase = useMemo(() => {
    return { ...additionals, ...info, ...embroidery, rules: ruleIds }
  }, [additionals, info, embroidery, ruleIds])

  const handleSave = useCallback(async () => {
    const route = purchaseId ? `/purchases/${purchaseId}` : `/purchases`
    const fetcher = purchaseId ? putDefault : postDefault
    const data = { ...purchase }

    const { success, message } = await fetcher<IResponsePurchase>(route, data)

    if (success) toast('sucesso', { type: 'success' })
    else toast(message, { type: 'error' })
  }, [purchase, purchaseId])

  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectCustomerCard />
            </Grid>
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseInfoCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseEmbroideryCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <SelectPurchaseRules purchaseId={purchaseId} />
            </Grid>
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseAdditionalFormCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" py={2}>
                <ButtonGroup>
                  <Button onClick={onPrev} variant="outlined">
                    Voltar
                  </Button>
                  <Button onClick={handleSave} variant="contained">
                    Finalizar
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
