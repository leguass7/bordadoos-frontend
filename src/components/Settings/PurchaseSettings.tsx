import { PurchaseSettingsForm } from './Form/PurchaseSettingsForm'

interface Props {
  children?: React.ReactNode
}

export const PurchaseSettings: React.FC<Props> = () => {
  return (
    <div>
      <PurchaseSettingsForm />
    </div>
  )
}
