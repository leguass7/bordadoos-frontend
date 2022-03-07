import React, { useCallback, useMemo, useState } from 'react'

import { createContext, useContext, useContextSelector } from 'use-context-selector'

export interface IPurchaseData {
  customerId?: number // for search

  clientName?: string
  typeLabel?: string
  categoryLabel?: string

  clientId?: number
  typeId?: number
  categoryId?: number
  qtd?: number
  value?: number
}

export interface IContextPurchase {
  purchase: IPurchaseData | null
  setPurchase: React.Dispatch<React.SetStateAction<IPurchaseData>>
  updatePurchase: (data: Partial<IPurchaseData>) => void
}

export const PurchaseContext = createContext({} as IContextPurchase)

export const PurchaseProvider: React.FC = ({ children }) => {
  const [purchase, setPurchase] = useState<IPurchaseData>(null)

  const updatePurchase = useCallback((data: Partial<IPurchaseData>) => {
    setPurchase(old => ({ ...old, ...data }))
  }, [])

  return (
    <PurchaseContext.Provider value={{ purchase, setPurchase, updatePurchase }}>{children}</PurchaseContext.Provider>
  )
}

export function usePurchase() {
  const { purchase, ...context } = useContext(PurchaseContext)

  const canSave = useMemo(() => {
    return purchase?.clientId && purchase?.typeId && purchase?.categoryId
  }, [purchase])

  return { purchase, ...context, canSave }
}

export function usePurchaseCustomer(): [number, (customerId?: number) => void] {
  const customerSelected = useContextSelector(PurchaseContext, ({ purchase }) => purchase?.customerId)
  const updatePurchase = useContextSelector(PurchaseContext, context => context.updatePurchase)

  const setCustomerSelected = useCallback(
    (customerId?: number) => {
      updatePurchase({ customerId })
    },
    [updatePurchase]
  )

  return [customerSelected, setCustomerSelected]
}
