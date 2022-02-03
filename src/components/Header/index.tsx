import React, { useCallback, useState } from 'react'

import { Settings, ExitToApp, AccountCircle } from '@mui/icons-material'
import { AppBar, Toolbar, Modal } from '@mui/material'

import { Container } from '~/components/Container'

// import { FormConfig } from '../FormConfig'
import { HeaderButton } from './HeaderButton'
import { ToolButtonMenu } from './ToolButtonMenu'

export const Header: React.FC = () => {
  const [configOpened, setConfigOpened] = useState(false)

  const handleConfig = useCallback(() => setConfigOpened(true), [])

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <ToolButtonMenu anchor="left" />
            <div style={{ flexGrow: 1 }} />
            <HeaderButton Icon={AccountCircle} path="/admin/account" />
            <HeaderButton Icon={Settings} onClick={handleConfig} />
            <HeaderButton Icon={ExitToApp} path="/admin/logout" />
          </Toolbar>
        </Container>
      </AppBar>
      <Modal open={configOpened} onClose={() => setConfigOpened(false)}>
        <div>
          {/* <FormConfig /> */}
          CONFIG
        </div>
      </Modal>
    </>
  )
}
