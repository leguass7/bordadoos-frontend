import React, { useCallback, useState } from 'react'

import { Search, Add, Delete } from '@mui/icons-material'
import { Button, ButtonGroup, Card, Fade, IconButton, Stack } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'
import { DrawerCustomer, SearchCustomerSelectHandler } from '~/components/Drawers/DrawerCustomer'
import { ModalCustomer, FormCustomerSuccessHandler } from '~/components/ModalCustomer'
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
  const handleClearCustomer = () => setCustomerId(null)

  const handleCustomerSuccess: FormCustomerSuccessHandler = useCallback(
    id => {
      if (id) setCustomerId(id)
      handleNewClose()
    },
    [setCustomerId]
  )

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
        <CardTitle title="Cliente" divider>
          <IconButton size="small" color="primary" onClick={handleSearchOpen}>
            <Search fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary" onClick={handleNewOpen}>
            <Add fontSize="small" />
          </IconButton>
          <IconButton size="small" color="primary" onClick={handleClearCustomer}>
            <Delete fontSize="small" />
          </IconButton>
        </CardTitle>
        <SpacedContainer>
          {customerId ? (
            <SelectedCustomer customerId={customerId} />
          ) : (
            <Fade in={true}>
              <Stack direction="row" spacing={2} justifyContent="center">
                <ButtonGroup>
                  <Button variant="outlined" color="primary" startIcon={<Search />} onClick={handleSearchOpen}>
                    Procurar
                  </Button>
                  <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleNewOpen}>
                    Novo
                  </Button>
                </ButtonGroup>
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
      <ModalCustomer
        open={openNew}
        onClose={handleNewClose}
        onSuccess={handleCustomerSuccess}
        customerId={0}
        title={'Incluir cliente'}
      />
    </>
  )
}
