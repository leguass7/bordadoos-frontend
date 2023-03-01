import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { PriceRules, Purchase } from '@prisma/client'

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
  changeInfo: (info: PurchasePanelInfo | Purchase) => void
  changeEmbroidery: (embroidery: PurchaseEmbroidery | Purchase) => void
  priceRules?: PriceRules[]
  setPriceRules?: React.Dispatch<React.SetStateAction<Partial<PriceRules>[]>>
  additionals: PurchaseAdditionals
  changeAdditionals: (additionals: PurchaseAdditionals | Purchase) => void
}

export const PurchasePanelContext = createContext({} as PurchaseContext)

export const PurchasePanelProvider: React.FC = ({ children }) => {
  const [info, setInfo] = useState({})
  const [embroidery, setEmbroidery] = useState({})
  const [priceRules, setPriceRules] = useState<PriceRules[]>([])
  const [additionals, setAdditionals] = useState({})

  const changeInfo = useCallback((info: Purchase) => {
    const { clientId, clientObs, deliveryDate, employeeObs, entryDate } = info
    setInfo(old => ({ ...old, clientId, clientObs, deliveryDate, employeeObs, entryDate }))
  }, [])

  const changeEmbroidery = useCallback((embroidery: Purchase) => {
    const { categoryId, colors, description, label, typeId } = embroidery
    setEmbroidery(old => ({ ...old, categoryId, colors, description, label, typeId }))
  }, [])

  const changeAdditionals = useCallback((additionals: Purchase) => {
    const { done, paid, points, qtd, value } = additionals
    setAdditionals(old => ({ ...old, done, paid, points, qtd, value }))
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
  const { priceRules, ...context } = useContext(PurchasePanelContext)

  const ruleIds = useMemo(() => {
    return priceRules?.map?.(({ id }) => id) ?? []
  }, [priceRules])

  return { priceRules, ...context, ruleIds }
}
