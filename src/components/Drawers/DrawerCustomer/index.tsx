import React, { useCallback, useEffect, useState } from 'react'

import SearchOffIcon from '@mui/icons-material/SearchOff'
import { Drawer, DrawerProps } from '@mui/material'
import type { Client } from '@prisma/client'

import { SearchBar } from '~/components/SearchBar'
import { useIsMounted } from '~/hooks/useIsMounted'
import { findAllCustomers } from '~/services/api/customer'

import { CircleLoading } from '../../CircleLoading'
import { SpacedContainer, Text } from '../../styled'
import { ListContainer } from '../styles'
import { ItemFound, SearchCustomerSelectHandler } from './ItemFound'

export type { SearchCustomerSelectHandler }
export { ItemFound }

type Props = DrawerProps & {
  defaultSelected?: number
  onSelecCustomer?: SearchCustomerSelectHandler
}

export const DrawerCustomer: React.FC<Props> = ({ defaultSelected, onSelecCustomer, ...drawerProps }) => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Client[]>([])

  const fetchCustomers = useCallback(
    async (search = '') => {
      setLoading(true)
      const response = await findAllCustomers({ search })
      if (isMounted.current) {
        setLoading(false)
        setData(response?.customers || [])
      }
    },
    [isMounted]
  )

  useEffect(() => {
    fetchCustomers()
  }, [fetchCustomers])

  // const handleSearchChange = useCallback(
  //   (search: string) => {
  //     if (!search) {
  //       setHasText(false)
  //       setData([])
  //       setLoading(false)
  //     } else {
  //       fetchCustomers(search)
  //     }
  //   },
  //   [fetchCustomers]
  // )

  const handleSearchChange = useCallback(
    (search: string) => {
      fetchCustomers(search)
    },
    [fetchCustomers]
  )

  return (
    <Drawer {...drawerProps}>
      <SearchBar onChangeText={handleSearchChange} />
      <ListContainer>
        {data?.length
          ? data.map(customer => {
              const key = `item-${customer.id}`
              return <ItemFound key={key} {...customer} onSelect={onSelecCustomer} selectedId={defaultSelected} />
            })
          : null}
      </ListContainer>

      {!loading && !data?.length ? (
        <SpacedContainer align="center">
          <SearchOffIcon />
          <Text align="center">Nenhum cliente encontrado</Text>
        </SpacedContainer>
      ) : null}

      {loading ? <CircleLoading light /> : null}
    </Drawer>
  )
}
