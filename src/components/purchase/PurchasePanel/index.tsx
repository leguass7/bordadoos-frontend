import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { Divider, Grid } from '@mui/material'

import { useIsMounted } from '~/hooks/useIsMounted'
import { findPurchaseWithItems } from '~/services/api/purchase'

import { PurchasePanelProvider, usePurchasePanelContext } from './PurchasePanelProvider'
import { PurchasePanelStepper } from './PurchasePanelStepper'
import { PurchaseAdditionals } from './steps/PurchaseAdditionals'
import { PurchaseEmbroidery } from './steps/PurchaseEmbroidery'
import { PurchaseInfo } from './steps/PurchaseInfo'
import { PurchaseSummary } from './steps/PurchaseSummary'

interface Props {
  purchaseId?: number
}

// Depends on PurchasePanelProvider
export const PurchasePanel: React.FC<Props> = ({ purchaseId }) => {
  const { changeAdditionals, changeEmbroidery, changeInfo } = usePurchasePanelContext()
  const [step, setStep] = useState(0)

  const isMounted = useIsMounted()

  const handleNext = useCallback(() => setStep(old => old + 1), [])
  const handlePrev = useCallback(() => setStep(old => old - 1), [])

  const updatePurchaseData = useCallback(async () => {
    if (!purchaseId) return null
    const { purchase } = await findPurchaseWithItems(purchaseId)

    if (isMounted()) {
      changeAdditionals(purchase)
      changeEmbroidery(purchase)
      changeInfo(purchase)
    }
  }, [purchaseId, isMounted, changeAdditionals, changeEmbroidery, changeInfo])

  useEffect(() => {
    updatePurchaseData()
  }, [updatePurchaseData])

  const showSuccessMessage = useCallback(() => {
    toast('Informações salvas com sucesso', { type: 'success' })
  }, [])

  return (
    <Grid container py={2}>
      <Grid item xs={12}>
        <PurchasePanelStepper step={step} />
        <Divider sx={{ py: 1, mb: 2 }} />
        {step === 0 ? <PurchaseInfo onSuccess={showSuccessMessage} onNext={handleNext} /> : null}
        {step === 1 ? (
          <PurchaseEmbroidery onSuccess={showSuccessMessage} onPrev={handlePrev} onNext={handleNext} />
        ) : null}
        {step === 2 ? <PurchaseAdditionals purchaseId={purchaseId} onPrev={handlePrev} onNext={handleNext} /> : null}
        {step === 3 ? (
          <PurchaseSummary purchaseId={purchaseId} onSuccess={showSuccessMessage} onPrev={handlePrev} />
        ) : null}
      </Grid>
    </Grid>
  )
}
