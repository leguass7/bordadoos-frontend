import { useCallback, useMemo, useState } from 'react'

import { Add, Delete, Search } from '@mui/icons-material'
import { Button, ButtonGroup, Card, Fade, IconButton, Stack } from '@mui/material'

import { CardTitle } from '~/components/CardTitle'
import { DrawerCustomer, SearchCustomerSelectHandler } from '~/components/Drawers/DrawerCustomer'
import { FormCustomerSuccessHandler, ModalCustomer } from '~/components/ModalCustomer'
import { SelectedCustomer } from '~/components/purchase/SelectedCustomer'
import { SpacedContainer } from '~/components/styled'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {}

export const SelectCustomer: React.FC<Props> = () => {
  const [openSearch, setOpenSearch] = useState(false)
  const [openNew, setOpenNew] = useState(false)

  const { info = {}, changeInfo } = usePurchasePanelContext()

  const clientId = useMemo(() => info.clientId, [info])

  const handleSearchClose = () => setOpenSearch(false)
  const handleSearchOpen = () => setOpenSearch(true)
  const handleNewClose = () => setOpenNew(false)
  const handleNewOpen = () => setOpenNew(true)
  const handleClearCustomer = () => changeInfo({ clientId: null })

  const handleCustomerSuccess: FormCustomerSuccessHandler = useCallback(
    clientId => {
      if (clientId) changeInfo({ clientId })
      handleNewClose()
    },
    [changeInfo]
  )

  const handleSelectFound: SearchCustomerSelectHandler = useCallback(
    clientId => {
      changeInfo({ clientId })
      handleSearchClose()
    },
    [changeInfo]
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
          {clientId ? (
            <SelectedCustomer customerId={clientId} />
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
        defaultSelected={clientId}
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
