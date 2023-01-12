import { useState } from 'react'

import { GetServerSideProps, NextPage } from 'next'
import { getSession } from 'next-auth/react'

import { Divider, Typography } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PurchaseSettings } from '~/components/Settings/PurchaseSettings'
import { SettingsChips } from '~/components/Settings/SettingsChips'
import { Content } from '~/styles/common'

interface Props {}

const Settings: NextPage<Props> = () => {
  const [selected, setSelected] = useState(1)

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })

  const hasAccess = session?.user?.level > 7

  const result = { props: {} }

  if (!hasAccess) return { ...result, notFound: true }

  return result
}

export default Settings
