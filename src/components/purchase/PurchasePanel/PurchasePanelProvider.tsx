import { createContext, useCallback, useContext, useMemo } from 'react'

import { PriceRules, Purchase } from '@prisma/client'

import { removeInvalidValues } from '~/helpers/object'
import { usePersistedState } from '~/hooks/usePersistedState'

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
  developmentPrice?: number
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
  const [info, setInfo] = usePersistedState<PurchasePanelInfo>('purchase-panel-info', {}, !purchaseId)
  const [embroidery, setEmbroidery] = usePersistedState<PurchaseEmbroidery>(
    'purchase-panel-embroidery',
    {},
    !purchaseId
  )

  const [priceRules, setPriceRules] = usePersistedState<PriceRules[]>('purchase-panel-price-rules', [], !purchaseId)

  const [additionals, setAdditionals] = usePersistedState<PurchaseAdditionals>(
    'purchase-panel-additionals',
    {},
    !purchaseId
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

        const newInfo = { ...old, clientId, clientObs, employeeObs, entryDate, deliveryDate, name }

        return removeInvalidValues(newInfo)
      })
    },
    [setInfo]
  )

  const changeEmbroidery = useCallback(
    (embroidery: Purchase) => {
      setEmbroidery(old => {
        const categoryId = embroidery?.categoryId || old?.categoryId
        const colors = (embroidery?.colors as any) || old?.colors
        const description = embroidery?.description || old?.description
        const label = embroidery?.label || old?.label
        const typeId = embroidery?.typeId || old?.typeId

        const newEmbroidery = { ...old, categoryId, colors, description, label, typeId }

        return removeInvalidValues(newEmbroidery)
      })
    },
    [setEmbroidery]
  )

  const changeAdditionals = useCallback(
    (additionals: any) => {
      setAdditionals(old => {
        const done = additionals?.done || old?.done
        const paid = additionals?.paid || old?.paid
        const points = additionals?.points || old?.points
        const qtd = additionals?.qtd || old?.qtd
        const value = additionals?.value || old?.value
        const developmentPrice = additionals?.developmentPrice || old?.developmentPrice

        const newAdditionals = { ...old, done, paid, points, qtd, value, developmentPrice }

        return removeInvalidValues(newAdditionals)
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
