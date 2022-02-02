import { Modal } from '@mui/material'

import { ClientForm } from '../Clients/ClientForm'
import { ModalForm } from '../ModalForm'

export type FormCustomerSuccessHandler = (custometId: number) => void

type Props = {
  title: string
  onClose: () => void
  onSuccess?: FormCustomerSuccessHandler
  open: boolean
  customerId: number
}
export const ModalCustomer: React.FC<Props> = ({ title, open, onClose, customerId, onSuccess, ...modalProps }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        <ModalForm title={title}>
          <ClientForm clientId={customerId} onCancel={onClose} onSuccess={onSuccess} />
        </ModalForm>
      </div>
    </Modal>
  )
}
