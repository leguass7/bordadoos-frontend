import React, { useCallback, useMemo, useState } from 'react'

import { PriceRules } from '@prisma/client'
import { createContext, useContext, useContextSelector } from 'use-context-selector'

import { defaultPurchaseRules } from '~/config/constants'
import { IConfigPurchaseRules } from '~/serverSide/config/config.dto'
import { getConfig } from '~/services/api/config'

export interface IPurchaseData {
  // customerId?: number // for search
  clientId?: number
}

export interface IContextPurchase {
  rulesSelected?: PriceRules[]
  setRulesSelected?: React.Dispatch<React.SetStateAction<Partial<PriceRules>[]>>
  purchase: IPurchaseData | null
  setPurchase: React.Dispatch<React.SetStateAction<IPurchaseData>>
  updatePurchase: (data: Partial<IPurchaseData>) => void
  purchaseRules: IConfigPurchaseRules
  setPurchaseRules: React.Dispatch<React.SetStateAction<IConfigPurchaseRules>>
}

export const PurchaseContext = createContext({} as IContextPurchase)

export const PurchaseProvider: React.FC = ({ children }) => {
  const [purchase, setPurchase] = useState<IPurchaseData>(null)
  const [rulesSelected, setRulesSelected] = useState<PriceRules[]>([])
  const [purchaseRules, setPurchaseRules] = useState<IConfigPurchaseRules>(defaultPurchaseRules)

  const updatePurchase = useCallback((data: Partial<IPurchaseData>) => {
    setPurchase(old => ({ ...old, ...data }))
  }, [])

  const value = {
    purchase,
    setPurchase,
    updatePurchase,
    rulesSelected,
    setRulesSelected,
    purchaseRules,
    setPurchaseRules
  }

  return <PurchaseContext.Provider value={value}>{children}</PurchaseContext.Provider>
}

export function usePurchaseRules() {
  const [rulesSelected, setRulesSelected] = useContextSelector(
    PurchaseContext,
    ({ rulesSelected, setRulesSelected }) => [rulesSelected, setRulesSelected]
  )

  const [purchaseRules, setPurchaseRules] = useContextSelector(
    PurchaseContext,
    ({ purchaseRules, setPurchaseRules }) => [purchaseRules, setPurchaseRules]
  )

  const fetchPurchaseRules = useCallback(async () => {
    const response = await getConfig('purchaseRules')
    if (response?.data?.meta) setPurchaseRules(response.data.meta as any)
  }, [setPurchaseRules])

  const ruleIds = useMemo(() => {
    return rulesSelected?.map?.(({ id }) => id) ?? []
  }, [rulesSelected])

  return { rulesSelected, setRulesSelected, purchaseRules, fetchPurchaseRules, ruleIds }
}

export function usePurchase() {
  const { purchase, updatePurchase } = useContext(PurchaseContext)

  const clientId = useMemo(() => {
    return purchase?.clientId
  }, [purchase])

  return { purchase, clientId, updatePurchase }
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
