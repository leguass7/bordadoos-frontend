import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import { QontoConnector, QontoStepIcon } from './utils'

const steps = ['Informações do pedido', 'Informações do bordado', 'Informações adicionais', 'Resumo do pedido']

interface Props {
  step?: number
  setStep?: (step: number) => void
}

export const PurchasePanelStepper: React.FC<Props> = ({ step = 0, setStep }) => {
  return (
    <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
      {steps.map((label, index) => (
        <Step key={label} onClick={() => setStep(index)}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
