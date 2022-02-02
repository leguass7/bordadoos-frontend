import React, { useCallback, useState } from 'react'

import { Search, Add } from '@mui/icons-material'
import { Button, Card, Fade, Stack } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'
import { DrawerCustomer, SearchCustomerSelectHandler } from '~/components/DrawerCustomer'
import { ModalCustomer } from '~/components/ModalCustomer'
import { SpacedContainer } from '~/components/styled'

import { usePurchaseCustomer } from './PurchaseProvider'
import { SelectedCustomer } from './SelectedCustomer'

export const SelectCustomer: React.FC = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openNew, setOpenNew] = useState(false)
  const [customerId, setCustomerId] = usePurchaseCustomer()

  const handleSearchClose = () => setOpenSearch(false)
  const handleSearchOpen = () => setOpenSearch(true)
  const handleNewClose = () => setOpenNew(false)
  const handleNewOpen = () => setOpenNew(true)

  const handleSelectFound: SearchCustomerSelectHandler = useCallback(
    customerId => {
      setCustomerId(customerId)
      handleSearchClose()
    },
    [setCustomerId]
  )

  return (
    <>
      <Card>
        <CardTitle title="Cliente" divider />
        <SpacedContainer>
          {customerId ? (
            <SelectedCustomer customerId={customerId} />
          ) : (
            <Fade in={true}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button variant="outlined" color="primary" startIcon={<Search />} onClick={handleSearchOpen}>
                  Procurar
                </Button>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleNewOpen}>
                  Novo
                </Button>
              </Stack>
            </Fade>
          )}
        </SpacedContainer>
      </Card>
      <DrawerCustomer
        open={openSearch}
        onClose={handleSearchClose}
        onSelecCustomer={handleSelectFound}
        defaultSelected={customerId}
      />
      <ModalCustomer open={openNew} onClose={handleNewClose} customerId={0} title={'Incluir cliente'} />
    </>
  )
}
