import React from 'react'

import { SearchBar } from '../SearchBar'

export const ClientSearch: React.FC = () => {
  const handleSearchChange = (text: string) => {
    console.log('searching', text)
  }
  return <SearchBar onChangeText={handleSearchChange} />
}
