import { Search, Add } from '@mui/icons-material'
import { Button, Card, Stack, Drawer } from '@mui/material'
import React, { useState } from 'react'

import { CardTitle } from '~/components/CardTitle'
import { DrawerCustomer } from '~/components/DrawerCustomer'
import { ModalCustomer } from '~/components/ModalCustomer'
import { SpacedContainer } from '~/components/styled'

export const SelectCustomer: React.FC = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const handleSerachClose = () => {
    setOpenSearch(false)
  }

  const handleSearchOpen = () => {
    setOpenSearch(true)
  }

  const handleNewClose = () => {
    setOpenNew(false)
  }

  const handleNewOpen = () => {
    setOpenNew(true)
  }

  return (
    <>
      <Card>
        <CardTitle title="Cliente" divider />
        <SpacedContainer>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button variant="outlined" color="primary" startIcon={<Search />} onClick={handleSearchOpen}>
              Procurar
            </Button>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleNewOpen}>
              Novo
            </Button>
          </Stack>
        </SpacedContainer>
      </Card>
      <DrawerCustomer open={openSearch} onClose={handleSerachClose} />
      <ModalCustomer open={openNew} onClose={handleNewClose} customerId={0} title={'Incluir cliente'} />
    </>
  )
}
