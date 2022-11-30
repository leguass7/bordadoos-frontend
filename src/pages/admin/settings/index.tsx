import { useCallback, useEffect, useMemo } from 'react'

import { NextPage } from 'next'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { LayoutCenter } from '~/components/layouts/LayoutCenter'

interface Props {}

const Settings: NextPage<Props> = () => {
  const { back } = useRouter()

  const [session] = useSession()

  const isAdmin = useMemo(() => {
    return !!(session?.user?.level > 7)
  }, [session])

  const checkAccess = useCallback(() => {
    if (!isAdmin) back()
  }, [isAdmin, back])

  useEffect(() => {
    checkAccess()
  }, [checkAccess])

  if (!isAdmin) return null

  return (
    <LayoutCenter>
      <Typography variant="h3">Configurações</Typography>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button color="info" onClick={() => back()}>
          Voltar
        </Button>
      </div>
    </LayoutCenter>
  )
}

export default Settings
