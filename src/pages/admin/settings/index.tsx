import { useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Typography } from '@mui/material'

import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { SettingsChips } from '~/components/Settings/SettingsChips'
import { useHasAccess } from '~/hooks/useHasAccess'

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
    </LayoutAdmin>
  )
}

export default Settings
