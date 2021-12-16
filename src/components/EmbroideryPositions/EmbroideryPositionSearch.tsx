import { usePagination } from '../Providers/PaginationProvider'
import { SearchBar } from '../SearchBar'

export const EmbroideryPositionSearch: React.FC = () => {
  const { updateFilter } = usePagination()
  const handleSearchChange = (search: string) => {
    const filter = search ? { search } : {}
    updateFilter(filter)
  }
  return <SearchBar onChangeText={handleSearchChange} />
}
