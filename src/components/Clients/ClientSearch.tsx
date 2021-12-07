import React from 'react'

import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

export const ClientSearch: React.FC = () => {
  const { updateFilter } = usePagination()
  const handleSearchChange = (search: string) => {
    const filter = search ? { search } : {}
    updateFilter({ search })
    console.log('searching', search)
  }
  return <SearchBar onChangeText={handleSearchChange} />
}
