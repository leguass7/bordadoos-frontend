import React from 'react'
import { createContext, useContext } from 'use-context-selector'

export interface IContextPurchase {}

export const PurchaseContext = createContext({} as IContextPurchase)

export const PurchaseProvider: React.FC = ({ children }) => {
  return <PurchaseContext.Provider value={{}}>{children}</PurchaseContext.Provider>
}

export function usePurchase() {
  const context = useContext(PurchaseContext)
  return { ...context }
}
