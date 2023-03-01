import { createContext, useCallback, useContext, useState } from 'react'

import { PriceRules } from '@prisma/client'

export interface PurchasePanelInfo {
  entryDate?: Date
  deliveryDate?: string
  clientId?: number
  clientObs?: string
  employeeObs?: string
}

export interface PurchaseAdditionals {
  points?: number
  value?: number
  paid?: boolean
  done?: boolean
  qtd?: number
}

export interface PurchaseEmbroideryColor {
  label?: string
  colors?: string
  id?: number
}

export interface PurchaseEmbroidery {
  categoryId?: string
  typeId?: string
  label?: string
  description?: string
  colors?: PurchaseEmbroideryColor[]
}

interface PurchaseContext {
  info: PurchasePanelInfo
  embroidery: PurchaseEmbroidery
  changeInfo: (info: PurchasePanelInfo) => void
  changeEmbroidery: (embroidery: PurchaseEmbroidery) => void
  priceRules?: PriceRules[]
  setPriceRules?: React.Dispatch<React.SetStateAction<Partial<PriceRules>[]>>
  additionals: PurchaseAdditionals
  changeAdditionals: (additionals: PurchaseAdditionals) => void
}

export const PurchasePanelContext = createContext({} as PurchaseContext)

export const PurchasePanelProvider: React.FC = ({ children }) => {
  const [info, setInfo] = useState({})
  const [embroidery, setEmbroidery] = useState({})
  const [priceRules, setPriceRules] = useState<PriceRules[]>([])
  const [additionals, setAdditionals] = useState({})

  const changeInfo = useCallback((info: PurchasePanelInfo) => {
    setInfo(old => ({ ...old, ...info }))
  }, [])

  const changeEmbroidery = useCallback((embroidery: PurchaseEmbroidery) => {
    setEmbroidery(old => ({ ...old, ...embroidery }))
  }, [])

  const changeAdditionals = useCallback((additionals: PurchaseAdditionals) => {
    setAdditionals(old => ({ ...old, ...additionals }))
  }, [])

  return (
    <PurchasePanelContext.Provider
      value={{
        info,
        embroidery,
        changeEmbroidery,
        changeInfo,
        priceRules,
        setPriceRules,
        additionals,
        changeAdditionals
      }}
    >
      {children}
    </PurchasePanelContext.Provider>
  )
}

export function usePurchasePanelContext() {
  return useContext(PurchasePanelContext)
}
