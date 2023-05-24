import { useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { Button, ButtonGroup, Grid } from '@mui/material'

import { PanelWrapper } from '~/components/purchase/styles'
import { IResponsePurchase } from '~/serverSide/purchases/purchase.dto'
import { postDefault, putDefault } from '~/services/api'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseAdditionalFormCard } from '../PurchaseAdditionals/PurchaseAdditionalFormCard'
import { SelectPurchaseRules } from '../PurchaseAdditionals/SelectPurchaseRules'
import { PurchaseEmbroideryCard } from '../PurchaseEmbroidery/PurchaseEmbroideryCard'
import { PurchaseEmbroideryColorCard } from '../PurchaseEmbroidery/PurchaseEmbroideryColorCard'
import { PurchaseImagesCard } from '../PurchaseImages'
import { PurchaseInfoCard } from '../PurchaseInfo/PurchaseInfoCard'
import { SelectCustomerCard } from '../PurchaseInfo/SelectCustomerCard'
import { PurchaseSuccess } from './PurchaseSuccess'

interface Props {
  onPrev?: () => void
  initialPurchaseId?: number
  onSuccess?: () => void
  restart?: () => void
  duplicated?: boolean
}

export const PurchaseSummary: React.FC<Props> = ({ onPrev, initialPurchaseId, onSuccess, restart, duplicated }) => {
  const { additionals, info, embroidery, ruleIds, clearAll } = usePurchasePanelContext()

  const [saved, setSaved] = useState(false)
  const [purchaseId, setpurchaseId] = useState(initialPurchaseId)

  const isEditing = useMemo(() => initialPurchaseId && !duplicated, [initialPurchaseId, duplicated])

  const purchase = useMemo(() => {
    return { ...additionals, ...info, ...embroidery, rules: ruleIds }
  }, [additionals, info, embroidery, ruleIds])

  const handleSave = useCallback(async () => {
    const route = isEditing ? `/purchases/${initialPurchaseId}` : `/purchases`
    const fetcher = isEditing ? putDefault : postDefault
    const data = { ...purchase }

    const { success, message, purchase: foundPurchase } = await fetcher<IResponsePurchase>(route, data)

    const id = foundPurchase?.id

    if (success) {
      setpurchaseId(id)
      setSaved(true)
      clearAll?.()
    } else toast(message, { type: 'error' })
  }, [purchase, initialPurchaseId, clearAll, isEditing])

  return saved ? (
    <PurchaseSuccess edited={!!initialPurchaseId} goBack={restart} purchaseId={purchaseId} />
  ) : (
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
          <PurchaseEmbroideryColorCard onSuccess={onSuccess} />
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
        {isEditing ? (
          <PanelWrapper>
            <PurchaseImagesCard purchaseId={initialPurchaseId} />
          </PanelWrapper>
        ) : null}
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
