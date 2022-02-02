import { Drawer, DrawerProps } from '@mui/material'
import React, { useCallback } from 'react'

import { SearchBar } from '~/components/SearchBar'
import { findCustomer } from '~/services/api'

type Props = DrawerProps & {}

export const DrawerCustomer: React.FC<Props> = ({ ...drawerProps }) => {
  const fetchCustomers = useCallback(async (search?: string) => {
    const response = await findCustomer({ search })
    console.log(response)
  }, [])

  const handleSearchChange = useCallback(
    (search: string) => {
      console.log('searching', search)
      fetchCustomers(search)
    },
    [fetchCustomers]
  )

  return (
    <Drawer {...drawerProps}>
      <SearchBar onChangeText={handleSearchChange} />
    </Drawer>
  )
}
