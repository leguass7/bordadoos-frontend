import React, { useCallback, useMemo, useState } from 'react'

import { useSession } from 'next-auth/react'

import { Settings, ExitToApp, AccountCircle } from '@mui/icons-material'
import { AppBar, Toolbar, Modal } from '@mui/material'

import { Container } from '~/components/Container'

// import { FormConfig } from '../FormConfig'
import { HeaderButton } from './HeaderButton'
import { ToolButtonMenu } from './ToolButtonMenu'

export const Header: React.FC = () => {
  const { data: session } = useSession()

  const isAdmin = useMemo(() => {
    return !!(session?.user?.level > 7)
  }, [session])

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <ToolButtonMenu anchor="left" />
            <div style={{ flexGrow: 1 }} />
            <HeaderButton Icon={AccountCircle} path="/admin/account" />
            {isAdmin ? <HeaderButton Icon={Settings} path="/admin/settings" /> : null}
            <HeaderButton Icon={ExitToApp} path="/admin/logout" />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  )
}
