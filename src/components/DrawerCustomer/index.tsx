import React, { useCallback, useState } from 'react'

import SearchOffIcon from '@mui/icons-material/SearchOff'
import { Drawer, DrawerProps } from '@mui/material'
import type { Client } from '@prisma/client'

import { SearchBar } from '~/components/SearchBar'
import { useIsMounted } from '~/hooks/useIsMounted'
import { findAllCustomers } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { SpacedContainer, Text } from '../styled'
import { ItemFound, SearchCustomerSelectHandler } from './ItemFound'
import { ListContainer } from './styles'

export type { SearchCustomerSelectHandler }
export { ItemFound }

type Props = DrawerProps & {
  defaultSelected?: number
  onSelecCustomer?: SearchCustomerSelectHandler
}

export const DrawerCustomer: React.FC<Props> = ({ defaultSelected, onSelecCustomer, ...drawerProps }) => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [hasText, setHasText] = useState(false)
  const [data, setData] = useState<Client[]>([])

  const fetchCustomers = useCallback(
    async (search?: string) => {
      setLoading(true)
      const response = await findAllCustomers({ search })
      if (isMounted.current) {
        setLoading(false)
        setData(response?.customers || [])
      }
    },
    [isMounted]
  )

  const handleSearchChange = useCallback(
    (search: string) => {
      if (!search) {
        setHasText(false)
        setData([])
        setLoading(false)
      } else {
        fetchCustomers(search)
      }
    },
    [fetchCustomers]
  )

  return (
    <Drawer {...drawerProps}>
      <SearchBar onChangeText={handleSearchChange} />
      <ListContainer>
        {data.map(customer => {
          const key = `item-${customer.id}`
          return <ItemFound key={key} {...customer} onSelect={onSelecCustomer} selectedId={defaultSelected} />
        })}
        {loading ? <CircleLoading light /> : null}
      </ListContainer>
      {!loading && hasText ? (
        <SpacedContainer align="center">
          <SearchOffIcon />
          <Text align="center">Nenhum cliente encontrado</Text>
        </SpacedContainer>
      ) : null}
    </Drawer>
  )
}
