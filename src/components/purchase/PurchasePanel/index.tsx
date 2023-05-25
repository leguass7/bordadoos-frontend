import { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { useRouter } from 'next/router'

import { Divider, Grid } from '@mui/material'

import { useIsMounted } from '~/hooks/useIsMounted'
import { findPurchaseWithItems } from '~/services/api/purchase'

import { PurchaseName } from './PurchaseName'
import { usePurchasePanelContext } from './PurchasePanelProvider'
import { PurchasePanelStepper } from './PurchasePanelStepper'
import { PurchaseAdditionals } from './steps/PurchaseAdditionals'
import { PurchaseEmbroidery } from './steps/PurchaseEmbroidery'
import { PurchaseInfo } from './steps/PurchaseInfo'
import { PurchaseSummary } from './steps/PurchaseSummary'

interface Props {
  purchaseId?: number
  duplicated?: boolean
}

// Depends on PurchasePanelProvider
export const PurchasePanel: React.FC<Props> = ({ purchaseId, duplicated }) => {
  const { changeAdditionals, changeEmbroidery, changeInfo } = usePurchasePanelContext()
  const editing = purchaseId || (purchaseId && duplicated)
  const [step, setStep] = useState(editing ? 3 : 0)
  const { replace } = useRouter()

  const isMounted = useIsMounted()

  const handleNext = useCallback(() => setStep(old => old + 1), [])
  const handlePrev = useCallback(() => setStep(old => old - 1), [])
  const restart = useCallback(() => {
    replace('/admin')
    setStep(0)
  }, [replace])

  const updatePurchaseData = useCallback(async () => {
    if (!purchaseId) return null
    const { purchase } = await findPurchaseWithItems(purchaseId)

    if (duplicated) {
      purchase.name = null
      purchase.lock = false
    }

    if (isMounted()) {
      changeAdditionals(purchase)
      changeEmbroidery(purchase)
      changeInfo(purchase)

      if (duplicated) toast('Informações copiadas com sucesso', { type: 'success' })
    }
  }, [purchaseId, isMounted, changeAdditionals, changeEmbroidery, changeInfo, duplicated])

  useEffect(() => {
    updatePurchaseData()
  }, [updatePurchaseData])

  const showSuccessMessage = useCallback(() => {
    toast('Informações salvas com sucesso', { type: 'success' })
  }, [])

  const handleChangeStep = useCallback(
    (step: number) => {
      if (purchaseId) setStep(step)
    },
    [purchaseId]
  )

  return (
    <Grid container py={2}>
      <Grid item xs={12}>
        <PurchasePanelStepper setStep={handleChangeStep} step={step} />
        <PurchaseName />
        <Divider sx={{ py: 1, mb: 2 }} />
        {step === 0 ? <PurchaseInfo onNext={handleNext} /> : null}

        {step === 1 ? <PurchaseEmbroidery onPrev={handlePrev} onNext={handleNext} /> : null}

        {step === 2 ? <PurchaseAdditionals purchaseId={purchaseId} onPrev={handlePrev} onNext={handleNext} /> : null}

        {step === 3 ? (
          <PurchaseSummary
            restart={restart}
            initialPurchaseId={purchaseId}
            // onSuccess={showSuccessMessage}
            onPrev={handlePrev}
            duplicated={duplicated}
          />
        ) : null}
      </Grid>
    </Grid>
  )
}
