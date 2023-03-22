import { createContext, useCallback, useContext, useMemo, useState } from 'react'

import { PriceRules, Purchase } from '@prisma/client'

import { useStateSelector } from '~/hooks/useStateSelector'

export interface PurchasePanelInfo {
  entryDate?: Date
  deliveryDate?: Date
  clientId?: number
  clientObs?: string
  employeeObs?: string
  name?: string
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
  colors?: string[]
  id?: number
}

export interface PurchaseEmbroidery {
  categoryId?: number
  typeId?: number
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
  clearAll?: () => void
}

export const PurchasePanelContext = createContext({} as PurchaseContext)

interface Props {
  purchaseId?: number
}

export const PurchasePanelProvider: React.FC<Props> = ({ children, purchaseId }) => {
  const [info, setInfo] = useStateSelector<PurchasePanelInfo>(!purchaseId, 'purchase-panel-info', {})
  const [embroidery, setEmbroidery] = useStateSelector<PurchaseEmbroidery>(!purchaseId, 'purchase-panel-embroidery', {})

  const [priceRules, setPriceRules] = useStateSelector<PriceRules[]>(!purchaseId, 'purchase-panel-price-rules', [])

  const [additionals, setAdditionals] = useStateSelector<PurchaseAdditionals>(
    !purchaseId,
    'purchase-panel-additionals',
    {}
  )

  const clearAll = useCallback(() => {
    setEmbroidery({})
    setInfo({})
    setAdditionals({})
    setPriceRules([])
  }, [setAdditionals, setEmbroidery, setInfo, setPriceRules])

  const changeInfo = useCallback(
    (info: Purchase) => {
      setInfo(old => {
        const clientId = info?.clientId || old?.clientId
        const clientObs = info?.clientObs || old?.clientObs
        const employeeObs = info?.employeeObs || old?.employeeObs
        const entryDate = info?.entryDate || old?.entryDate
        const deliveryDate = info?.deliveryDate || old?.deliveryDate
        const name = info?.name || old?.name

        return { ...old, clientId, clientObs, deliveryDate, employeeObs, entryDate, name }
      })
    },
    [setInfo]
  )

  const changeEmbroidery = useCallback(
    (embroidery: Purchase) => {
      setEmbroidery(old => {
        const categoryId = embroidery?.categoryId || old.categoryId
        const colors = (embroidery?.colors as any) || old.colors
        const description = embroidery?.description || old.description
        const label = embroidery?.label || old.label
        const typeId = embroidery?.typeId || old.typeId

        return { ...old, categoryId, colors, description, label, typeId }
      })
    },
    [setEmbroidery]
  )

  const changeAdditionals = useCallback(
    (additionals: Purchase) => {
      setAdditionals(old => {
        const done = additionals?.done || old?.done
        const paid = additionals?.paid || old?.paid
        const points = additionals?.points || old?.points
        const qtd = additionals?.qtd || old?.qtd
        const value = additionals?.value || old?.value

        return { ...old, done, paid, points, qtd, value }
      })
    },
    [setAdditionals]
  )

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
        changeAdditionals,
        clearAll
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
