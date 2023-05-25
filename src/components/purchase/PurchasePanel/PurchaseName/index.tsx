import { useCallback, useEffect, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'

import { stringAvatar } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getUserForPurchase } from '~/services/api/user'

import { usePurchasePanelContext } from '../PurchasePanelProvider'

interface Props {
  children?: React.ReactNode
}

export const PurchaseName: React.FC<Props> = () => {
  const { changeInfo } = usePurchasePanelContext()
  const { data } = useSession()

  const [user, setUser] = useState<any>({})
  const isMounted = useIsMounted()

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

  return <></>
}
