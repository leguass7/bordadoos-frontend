import { createContext, useCallback, useContext, useMemo } from 'react'

import { PriceRules, Purchase } from '@prisma/client'

import { removeInvalidValues } from '~/helpers/object'
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
        const clientId = info?.clientId
        const clientObs = info?.clientObs
        const employeeObs = info?.employeeObs
        const entryDate = info?.entryDate
        const deliveryDate = info?.deliveryDate
        const name = info?.name

        const newInfo = { ...old, clientId, clientObs, employeeObs, entryDate, deliveryDate, name }

        return removeInvalidValues(newInfo)
      })
    },
    [setInfo]
  )

  const changeEmbroidery = useCallback(
    (embroidery: Purchase) => {
      setEmbroidery((old: any) => {
        const categoryId = embroidery?.categoryId
        const colors = embroidery?.colors as any
        const description = embroidery?.description
        const label = embroidery?.label
        const typeId = embroidery?.typeId

        const newEmbroidery = { ...old, categoryId, colors, description, label, typeId }

        return removeInvalidValues(newEmbroidery)
      })
    },
    [setEmbroidery]
  )

  const changeAdditionals = useCallback(
    (additionals: any) => {
      setAdditionals(old => {
        const done = additionals?.done
        const paid = additionals?.paid
        const points = additionals?.points
        const qtd = additionals?.qtd
        const value = additionals?.value
        const developmentPrice = additionals?.developmentPrice

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
