import React, { useCallback, useMemo, useState } from 'react'

import { createContext, useContext } from 'use-context-selector'

export interface IPurchaseData {
  // customerId?: number // for search

  clientId?: number
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

  const clientId = useMemo(() => {
    return purchase?.clientId
  }, [purchase])

  return { purchase, ...context, clientId }
}

// export function usePurchaseCustomer(): [number, (customerId?: number) => void] {
//   const customerSelected = useContextSelector(PurchaseContext, ({ purchase }) => purchase?.customerId)
//   const updatePurchase = useContextSelector(PurchaseContext, context => context.updatePurchase)

//   const setCustomerSelected = useCallback(
//     (customerId?: number) => {
//       updatePurchase({ customerId })
//     },
//     [updatePurchase]
//   )

//   return [customerSelected, setCustomerSelected]
// }
