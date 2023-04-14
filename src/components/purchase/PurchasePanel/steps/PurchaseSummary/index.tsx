import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from 'react-toastify'

import { useSession } from 'next-auth/react'

import { Button, ButtonGroup, Grid } from '@mui/material'
import type { Purchase } from '@prisma/client'

import { PanelWrapper } from '~/components/purchase/styles'
import { stringAvatar } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { IResponsePurchase } from '~/serverSide/purchases/purchase.dto'
import { postDefault, putDefault } from '~/services/api'
import { getUserForPurchase } from '~/services/api/user'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseAdditionalFormCard } from '../PurchaseAdditionals/PurchaseAdditionalFormCard'
import { SelectPurchaseRules } from '../PurchaseAdditionals/SelectPurchaseRules'
import { PurchaseEmbroideryCard } from '../PurchaseEmbroidery/PurchaseEmbroideryCard'
import { PurchaseEmbroideryColorCard } from '../PurchaseEmbroidery/PurchaseEmbroideryColorCard'
import { PurchaseInfoCard } from '../PurchaseInfo/PurchaseInfoCard'
import { SelectCustomerCard } from '../PurchaseInfo/SelectCustomerCard'
import { PurchaseSuccess } from './PurchaseSuccess'

interface Props {
  onPrev?: () => void
  initialPurchaseId?: number
  onSuccess?: () => void
  restart?: () => void
  duplicated?: boolean
}

export const PurchaseSummary: React.FC<Props> = ({ onPrev, initialPurchaseId, onSuccess, restart, duplicated }) => {
  const { additionals, info, embroidery, ruleIds, clearAll } = usePurchasePanelContext()

  const { data } = useSession()

  const [saved, setSaved] = useState(false)
  const [purchaseId, setpurchaseId] = useState(initialPurchaseId)

  const [user, setUser] = useState<any>({})
  const isMounted = useIsMounted()

  const isEditing = useMemo(() => initialPurchaseId && !duplicated, [initialPurchaseId, duplicated])

  const fetchUser = useCallback(async () => {
    if (user?.name) return null

    const userId = parseInt(`${data.user?.userId}`)
    if (!userId || isEditing) return null

    const { success, user: foundUser } = await getUserForPurchase(userId)
    if (isMounted() && success) setUser(foundUser)
  }, [isMounted, data?.user, isEditing, user])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const purchaseCod = useMemo(() => {
    if (!user?.name) return null

    const name = user?.name
    const purchaseQtd = user?._count?.createdPurchases

    const counter = !!purchaseQtd ? purchaseQtd + 1 : 1

    return `${stringAvatar(name)}${counter}`
  }, [user?.name, user?._count])

  const purchase = useMemo(() => {
    const optional: Partial<Purchase> = {}
    if (!isEditing && purchaseCod) optional.name = purchaseCod

    return { ...additionals, ...info, ...embroidery, rules: ruleIds, ...optional }
  }, [additionals, info, embroidery, ruleIds, isEditing, purchaseCod])

  const handleSave = useCallback(async () => {
    const route = isEditing ? `/purchases/${initialPurchaseId}` : `/purchases`
    const fetcher = isEditing ? putDefault : postDefault
    const data = { ...purchase }

    const { success, message, purchase: foundPurchase } = await fetcher<IResponsePurchase>(route, data)

    const id = foundPurchase?.id

    if (success) {
      setpurchaseId(id)
      setSaved(true)
      clearAll?.()
    } else toast(message, { type: 'error' })
  }, [purchase, initialPurchaseId, clearAll, isEditing])

  return saved ? (
    <PurchaseSuccess name={purchaseCod} edited={!!initialPurchaseId} goBack={restart} purchaseId={purchaseId} />
  ) : (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SelectCustomerCard />
            </Grid>
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseInfoCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseEmbroideryCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseEmbroideryColorCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <SelectPurchaseRules purchaseId={purchaseId} />
            </Grid>
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseAdditionalFormCard onSuccess={onSuccess} />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" py={2}>
                <ButtonGroup>
                  <Button onClick={onPrev} variant="outlined">
                    Voltar
                  </Button>
                  <Button onClick={handleSave} variant="contained">
                    Finalizar
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
