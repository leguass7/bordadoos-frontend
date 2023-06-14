import { createContext, useCallback, useContext, useMemo } from 'react'

import { PriceRules, Purchase } from '@prisma/client'

import { mergeDeep, removeInvalidValues } from '~/helpers/object'
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
  unityValue?: number
  developmentPrice?: number
  done?: boolean
  qtd?: number
}

export interface PurchaseEmbroideryColor {
  label: string
  colors: string[]
  // id?: number
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
  isEditing?: boolean
}

export const PurchasePanelContext = createContext({} as PurchaseContext)

interface Props {
  persist?: boolean
  isEditing?: boolean
}

export const PurchasePanelProvider: React.FC<Props> = ({ children, persist, isEditing }) => {
  const [info, setInfo] = usePersistedState<PurchasePanelInfo>('purchase-panel-info', { name: '' }, persist)
  const [embroidery, setEmbroidery] = usePersistedState<PurchaseEmbroidery>('purchase-panel-embroidery', {}, persist)

  const [priceRules, setPriceRules] = usePersistedState<PriceRules[]>('purchase-panel-price-rules', [], persist)

  const [additionals, setAdditionals] = usePersistedState<PurchaseAdditionals>(
    'purchase-panel-additionals',
    {},
    persist
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
        const clientId = info?.clientId === null ? null : info?.clientId || old?.clientId
        const clientObs = info?.clientObs
        const employeeObs = info?.employeeObs
        const entryDate = info?.entryDate
        const deliveryDate = info?.deliveryDate
        const name = info?.name || old?.name

        const dto = {
          clientId,
          clientObs,
          employeeObs,
          entryDate,
          deliveryDate,
          name
        }

        // const newInfo = removeInvalidValues<PurchasePanelInfo>({ ...old, ...dto })
        const newInfo = removeInvalidValues<PurchasePanelInfo>(mergeDeep(old, dto))
        // const newInfo = removeInvalidValues<PurchasePanelInfo>({
        //   clientId,
        //   clientObs,
        //   employeeObs,
        //   entryDate,
        //   deliveryDate,
        //   name
        // })

        return newInfo
      })
    },
    [setInfo]
  )

  const changeEmbroidery = useCallback(
    (embroidery: Purchase) => {
      setEmbroidery(old => {
        const colors = (embroidery?.colors as any) || old?.colors
        const description = embroidery?.description || old?.description
        const label = embroidery?.label || old?.label
        const typeId = embroidery?.typeId || old?.typeId
        const categoryId = embroidery?.categoryId || old?.categoryId

        const dto = { colors, description, label, typeId, categoryId }

        const newEmbroidery = removeInvalidValues<PurchaseEmbroidery>(mergeDeep(old, dto))
        // const newEmbroidery = { ...old, categoryId, colors, description, label, typeId }

        return removeInvalidValues(newEmbroidery)
      })
    },
    [setEmbroidery]
  )

  const changeAdditionals = useCallback(
    (additionals: Purchase) => {
      setAdditionals(old => {
        const done = !!additionals?.done
        const paid = !!additionals?.paid
        const qtd = additionals?.qtd
        const value = additionals?.value
        const developmentPrice = additionals?.developmentPrice

        const points = additionals?.points
        const unityValue = additionals?.unityValue

        const dto = { done, paid, qtd, value, developmentPrice, points, unityValue }

        const newAdditionals = removeInvalidValues<PurchaseAdditionals>(mergeDeep(old, dto))

        // const newAdditionals = { ...old, done, paid, points, qtd, value, developmentPrice, unityValue }

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
        clearAll,
        isEditing
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
