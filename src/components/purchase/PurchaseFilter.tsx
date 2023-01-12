import React, { useCallback, useState } from 'react'
import { IoReload } from 'react-icons/io5'

import { useRouter } from 'next/router'

import { Add } from '@mui/icons-material'
import { IconButton, Container, ButtonGroup, Button } from '@mui/material'
import { Purchase } from '@prisma/client'
import { Form } from '@unform/web'

import { debounceEvent } from '~/helpers/debounce'
import { formatDate } from '~/helpers/string'

import { DrawerCustomer } from '../Drawers/DrawerCustomer'
import { Datepicker } from '../Form/Datepicker'
import Select, { SelectItem } from '../Form/Select'
import { PageTitle } from '../PageTitle'
import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

const paidItems: SelectItem[] = [
  { label: 'Qualquer', value: null },
  { label: 'Não pago', value: 1 },
  { label: 'Pago', value: 2 }
]

const doneItems: SelectItem[] = [
  { label: 'Qualquer', value: null },
  { label: 'Não finalizado', value: 1 },
  { label: 'Finalizado', value: 2 }
]

export const PurchaseFilter: React.FC = () => {
  const { updateFilter, refreshData } = usePagination<Purchase>()
  const { push } = useRouter()

  const [openSearchCustomer, setOpenSearchCustomer] = useState(false)

  const handleSearchChange = useCallback(
    (field: string) => (search?: string | number | Date | boolean) => {
      const filter: any = { [field]: search instanceof Date ? formatDate(search, 'yyyy-MM-dd HH:mm:01') : search }
      updateFilter(filter)
    },
    [updateFilter]
  )

  const handleSelectCustomer = useCallback(
    (clientId?: number, name?: string) => {
      updateFilter({ clientId })
      setOpenSearchCustomer(false)
    },
    [updateFilter]
  )

  return (
    <>
      <Container>
        <PageTitle spotlight="Pedidos" title="cadastrados" description={'Lista de pedidos cadastrados'}>
          <IconButton size="large" color="primary" onClick={() => push('/admin')}>
            <Add />
          </IconButton>
          <IconButton size="large" color="primary" onClick={refreshData}>
            <IoReload size={18} />
          </IconButton>
          {/* <IconButton size="large" color="primary" onClick={() => setFiltered(old => !old)}> */}
          {/* {filtered ? <FilterListOff /> : <FilterList />} */}
          {/* </IconButton> */}
        </PageTitle>
      </Container>
      <Container style={{ marginBottom: '4px' }}>
        <SearchBar onChangeText={handleSearchChange('search')} />
        <Form onSubmit={null}>
          <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-start' }}>
            <Datepicker
              name="startDate"
              label="Data inicial"
              onChange={debounceEvent(handleSearchChange('startDate'), 700)}
              clearable
            />
            <Datepicker
              name="endDate"
              label="Data final"
              onChange={debounceEvent(handleSearchChange('endDate'), 700)}
              clearable
            />
            <Select
              sx={{ width: 200 }}
              name="paid"
              items={paidItems}
              onChange={e => handleSearchChange('paid')(e.target.value)}
              label="Pago"
            />
            <Select
              sx={{ width: 200 }}
              name="done"
              items={doneItems}
              onChange={e => handleSearchChange('done')(e.target.value)}
              label="Finalizado"
            />
          </div>
        </Form>
        <ButtonGroup style={{ padding: 12 }}>
          <Button variant="contained" color="primary" onClick={() => setOpenSearchCustomer(true)}>
            Procurar cliente
          </Button>
        </ButtonGroup>
      </Container>
      <DrawerCustomer
        open={openSearchCustomer}
        onClose={() => setOpenSearchCustomer(false)}
        onSelecCustomer={handleSelectCustomer}
      />
    </>
  )
}
