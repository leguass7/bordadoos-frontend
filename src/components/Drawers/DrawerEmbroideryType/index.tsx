import { useCallback, useEffect, useState } from 'react'

import SearchOffIcon from '@mui/icons-material/SearchOff'
import { Drawer, DrawerProps } from '@mui/material'
import { EmbroideryType } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { SearchBar } from '~/components/SearchBar'
import { SpacedContainer, Text } from '~/components/styled'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getDefault } from '~/services/api'

import { ListContainer } from '../styles'
import { TypeFound } from './TypeFound'

type Props = Omit<DrawerProps, 'onSelect'> & {
  defaultSelected?: number
  onSelect?: (_id: number, label?: string) => void
}

export const DrawerEmbroideryType: React.FC<Props> = ({ defaultSelected, onSelect, ...drawerProps }) => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<EmbroideryType[]>([])

  const fetchData = useCallback(
    async (search = '') => {
      setLoading(true)
      const { types, success } = await getDefault<{ types: EmbroideryType[] }>(
        `/embroidery/types/search?search=${search}`
      )
      if (isMounted()) {
        setLoading(false)
        if (success) setData(types)
      }
    },
    [isMounted]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleSearchChange = useCallback(
    (search: string) => {
      fetchData(search)
    },
    [fetchData]
  )

  return (
    <Drawer {...drawerProps}>
      <SearchBar onChangeText={handleSearchChange} />
      <ListContainer>
        {data?.length
          ? data.map(type => {
              const key = `item-${type.id}`
              return <TypeFound key={key} {...type} onSelect={onSelect} selectedId={defaultSelected} />
            })
          : null}
      </ListContainer>

      {!loading && !data?.length ? (
        <SpacedContainer align="center">
          <SearchOffIcon />
          <Text align="center">Nenhum tipo de bordado encontrado</Text>
        </SpacedContainer>
      ) : null}

      {loading ? <CircleLoading light /> : null}
    </Drawer>
  )
}
