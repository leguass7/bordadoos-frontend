import React from 'react'

import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

export const UserSearch: React.FC = () => {
  const { updateFilter } = usePagination()
  const handleSearchChange = (search: string) => {
    const filter = search ? { search } : {}
    updateFilter(filter)
  }
  return <SearchBar onChangeText={handleSearchChange} />
}
