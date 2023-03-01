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
import { PurchaseInfoCard } from '../PurchaseInfo/PurchaseInfoCard'
import { SelectCustomerCard } from '../PurchaseInfo/SelectCustomerCard'
import { PurchaseSuccess } from './PurchaseSuccess'

interface Props {
  onPrev?: () => void
  initialPurchaseId?: number
  onSuccess?: () => void
  restart?: () => void
}

export const PurchaseSummary: React.FC<Props> = ({ onPrev, initialPurchaseId, onSuccess, restart }) => {
  const { additionals, info, embroidery, ruleIds } = usePurchasePanelContext()

  const { data } = useSession()

  const [saved, setSaved] = useState(false)
  const [purchaseId, setpurchaseId] = useState(initialPurchaseId)

  const [user, setUser] = useState<any>({})
  const isMounted = useIsMounted()

  const fetchUser = useCallback(async () => {
    const userId = parseInt(`${data.user?.userId}`)
    if (!userId || !purchaseId) return null

    const { success, user } = await getUserForPurchase(userId)
    if (isMounted() && success) setUser(user)
  }, [isMounted, data?.user, purchaseId])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  const purchaseCod = useMemo(() => {
    if (!user?.name) return null

    const name = user?.name
    const counter = user?._count?.createdPurchases || 1

    return `${stringAvatar(name)}${counter}`
  }, [user])

  const purchase = useMemo(() => {
    const optional: Partial<Purchase> = {}
    if (!purchaseId && purchaseCod) optional.name = purchaseCod

    return { ...additionals, ...info, ...embroidery, rules: ruleIds, ...optional }
  }, [additionals, info, embroidery, ruleIds, purchaseId, purchaseCod])

  const handleSave = useCallback(async () => {
    const route = initialPurchaseId ? `/purchases/${initialPurchaseId}` : `/purchases`
    const fetcher = initialPurchaseId ? putDefault : postDefault
    const data = { ...purchase }

    const {
      success,
      message,
      purchase: { id }
    } = await fetcher<IResponsePurchase>(route, data)

    if (success) {
      setpurchaseId(id)
      setSaved(true)
    } else toast(message, { type: 'error' })
  }, [purchase, initialPurchaseId])

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
