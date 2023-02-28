import { createContext, useCallback, useContext, useState } from 'react'

export interface PurchasePanelInfo {
  entryDate?: Date
  deliveryDate?: string
  value?: number
  paid?: boolean
  done?: boolean
  clientId?: number
  clientObs?: string
  employeeObs?: string
}

export interface PurchaseEmbroidery {
  categoryId?: string
  typeId?: string
  qtd?: number
  label?: string
  description?: string
  points?: number
  colors?: string[]
}

interface PurchaseContext {
  info: PurchasePanelInfo
  embroidery: PurchaseEmbroidery
  changeInfo: (info: PurchasePanelInfo) => void
  changeEmbroidery: (embroidery: PurchaseEmbroidery) => void
}

export const PurchasePanelContext = createContext({} as PurchaseContext)

export const PurchasePanelProvider: React.FC = ({ children }) => {
  const [info, setInfo] = useState({})
  const [embroidery, setEmbroidery] = useState({})

  const changeInfo = useCallback((info: PurchasePanelInfo) => {
    setInfo(old => ({ ...old, ...info }))
  }, [])

  const changeEmbroidery = useCallback((embroidery: PurchaseEmbroidery) => {
    setEmbroidery(old => ({ ...old, ...embroidery }))
  }, [])

  return (
    <PurchasePanelContext.Provider value={{ info, embroidery, changeEmbroidery, changeInfo }}>
      {children}
    </PurchasePanelContext.Provider>
  )
}

export function usePurchasePanelContext() {
  return useContext(PurchasePanelContext)
}
