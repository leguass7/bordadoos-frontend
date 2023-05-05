import { useCallback, useEffect, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'

import { ArrowRightAlt } from '@mui/icons-material'
import { Button, Grid, Typography } from '@mui/material'

import { stringAvatar } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getUserForPurchase } from '~/services/api/user'

import { PanelWrapper } from '../../../styles'
import { usePurchasePanelContext } from '../../PurchasePanelProvider'
import { PurchaseInfoCard } from './PurchaseInfoCard'
import { SelectCustomerCard } from './SelectCustomerCard'

interface Props {
  onNext?: () => void
  onSuccess?: () => void
}

export const PurchaseInfo: React.FC<Props> = ({ onNext }) => {
  const { info, changeInfo } = usePurchasePanelContext()
  const { data } = useSession()

  const [user, setUser] = useState<any>({})
  const isMounted = useIsMounted()

  const disableNext = useMemo(() => {
    return !info?.clientId || !info?.entryDate
  }, [info])

  const fetchUser = useCallback(async () => {
    if (user?.name) return null

    const userId = parseInt(`${data.user?.userId}`)
    if (!userId) return null

    const { success, user: foundUser } = await getUserForPurchase(userId)
    if (isMounted() && success) setUser(foundUser)
  }, [isMounted, data?.user, user])

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

  const updatePurchaseName = useCallback(() => {
    if (purchaseCod) changeInfo({ name: purchaseCod })
  }, [purchaseCod, changeInfo])

  useEffect(() => {
    updatePurchaseName()
  }, [updatePurchaseName])

  return (
    <Grid container>
      <Grid item xs={12}>
        <PanelWrapper>
          <Grid item xs={12} sm={6}>
            <SelectCustomerCard />
          </Grid>
        </PanelWrapper>
        <PanelWrapper>
          <PurchaseInfoCard />
        </PanelWrapper>
        <PanelWrapper>
          <Grid container>
            <Grid item xs={12}>
              <Grid container justifyContent="center" alignItems="center" py={2}>
                <Button onClick={onNext} disabled={disableNext} variant="contained" endIcon={<ArrowRightAlt />}>
                  Avançar
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="center">
                {disableNext ? (
                  <Typography align="center" variant="caption" color="red">
                    Selecione o cliente e uma data de entrada para prosseguir
                  </Typography>
                ) : null}
              </Grid>
            </Grid>
          </Grid>
        </PanelWrapper>
      </Grid>
    </Grid>
  )
}
