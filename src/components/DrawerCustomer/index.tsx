import { Drawer, DrawerProps } from '@mui/material'
import React from 'react'

import { SearchBar } from '~/components/SearchBar'

type Props = DrawerProps & {}

export const DrawerCustomer: React.FC<Props> = ({ ...drawerProps }) => {
  const handleSearchChange = (search: string) => {
    console.log('searching', search)
  }

  return (
    <Drawer {...drawerProps}>
      <SearchBar onChangeText={handleSearchChange} />
    </Drawer>
  )
}
