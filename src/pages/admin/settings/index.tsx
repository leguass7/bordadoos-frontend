import { useEffect, useState } from 'react'

import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import { Divider, Typography } from '@mui/material'

import { CircleLoading } from '~/components/CircleLoading'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { SettingsChips } from '~/components/Settings/SettingsChips'
import { useHasAccess } from '~/hooks/useHasAccess'
import { Content } from '~/styles/common'

const DynamicPurchaseSettings = dynamic(
  () => import('~/components/Settings/PurchaseSettings').then(({ PurchaseSettings }) => PurchaseSettings),
  {
    loading: () => <CircleLoading />,
    ssr: false
  }
)

interface Props {}

const Settings: NextPage<Props> = () => {
  const [selected, setSelected] = useState(1)
  const hasAccess = useHasAccess(8)
  const { back } = useRouter()

  useEffect(() => {
    if (!hasAccess()) back()
  }, [hasAccess, back])

  return hasAccess() ? (
    <LayoutAdmin>
      <Typography align="center" variant="h4" py={3}>
        Configurações
      </Typography>
      <SettingsChips selected={selected} setSelected={setSelected} />
      <Divider sx={{ py: 2, width: '80%', mx: 'auto', mb: 2 }} />
      <Content>{selected === 1 ? <DynamicPurchaseSettings /> : null}</Content>
    </LayoutAdmin>
  ) : null
}

export default Settings
