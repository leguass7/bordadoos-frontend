import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Stepper from '@mui/material/Stepper'

import { QontoConnector, QontoStepIcon } from './utils'

const steps = ['Informações do pedido', 'Informações do bordado', 'Resumo da compra']

interface Props {
  step?: number
  hidePartnerSelection?: boolean
}

export const PurchasePanelStepper: React.FC<Props> = ({ step = 0 }) => {
  return (
    <Stepper alternativeLabel activeStep={step} connector={<QontoConnector />}>
      {steps.map(label => (
        <Step key={label}>
          <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}
