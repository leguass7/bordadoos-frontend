import { useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import { Divider, Grid } from '@mui/material'

import { PurchasePanelProvider } from './PurchasePanelProvider'
import { PurchasePanelStepper } from './PurchasePanelStepper'
import { PurchaseEmbroidery } from './steps/PurchaseEmbroidery'
import { PurchaseInfo } from './steps/PurchaseInfo'

interface Props {
  purchaseId?: number
}

export const PurchasePanel: React.FC<Props> = () => {
  const [step, setStep] = useState(0)

  const handleNext = useCallback(() => setStep(old => old + 1), [])
  const handlePrev = useCallback(() => setStep(old => old - 1), [])

  const showSuccessMessage = useCallback(() => {
    toast('Informações salvas com sucesso', { type: 'success' })
  }, [])

  return (
    <PurchasePanelProvider>
      <Grid container py={2}>
        <Grid item xs={12}>
          <PurchasePanelStepper step={step} />
          <Divider sx={{ py: 1, mb: 2 }} />
          {step === 0 ? <PurchaseInfo onSuccess={showSuccessMessage} onNext={handleNext} /> : null}
          {step === 1 ? (
            <PurchaseEmbroidery onSuccess={showSuccessMessage} onPrev={handlePrev} onNext={handleNext} />
          ) : null}
        </Grid>
      </Grid>
    </PurchasePanelProvider>
  )
}
