import { useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Container, Divider, Typography } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PurchaseSettings } from '~/components/Settings/PurchaseSettings'
import { SettingsChips } from '~/components/Settings/SettingsChips'
import { useHasAccess } from '~/hooks/useHasAccess'
import { Content } from '~/styles/common'

interface Props {}

const Settings: NextPage<Props> = () => {
  const [selected, setSelected] = useState(1)

  const { back } = useRouter()
  const hasAccess = useHasAccess(7)

  if (!hasAccess()) back()

  return (
    <LayoutAdmin>
      <Typography align="center" variant="h4" py={3}>
        Configurações
      </Typography>
      <SettingsChips selected={selected} setSelected={setSelected} />
      <Divider sx={{ py: 2, width: '80%', mx: 'auto', mb: 2 }} />
      <Content>{selected === 1 ? <PurchaseSettings /> : null}</Content>
    </LayoutAdmin>
  )
}

export default Settings
