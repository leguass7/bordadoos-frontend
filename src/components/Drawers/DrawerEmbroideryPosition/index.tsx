import { useCallback, useEffect, useState } from 'react'

import SearchOffIcon from '@mui/icons-material/SearchOff'
import { Drawer, DrawerProps } from '@mui/material'
import { EmbroideryPosition } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { SearchBar } from '~/components/SearchBar'
import { SpacedContainer, Text } from '~/components/styled'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getDefault } from '~/services/api'

import { ListContainer } from '../styles'
import { PositionFound } from './PositionFound'

type Props = Omit<DrawerProps, 'onSelect'> & {
  defaultSelected?: number
  onSelect?: (_id: number) => void
}

export const DrawerEmbroideryPosition: React.FC<Props> = ({ defaultSelected, onSelect, ...drawerProps }) => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<EmbroideryPosition[]>([])

  const fetchData = useCallback(
    async (search = '') => {
      setLoading(true)
      const { positions, success } = await getDefault<{ positions: EmbroideryPosition[] }>(
        `/embroidery/positions/search?search=${search}`
      )
      if (isMounted.current) {
        setLoading(false)
        if (success) setData(positions)
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
          ? data.map(position => {
              const key = `item-${position.id}`
              return <PositionFound key={key} {...position} onSelect={onSelect} selectedId={defaultSelected} />
            })
          : null}
      </ListContainer>

      {!loading && !data?.length ? (
        <SpacedContainer align="center">
          <SearchOffIcon />
          <Text align="center">Nenhuma posição de bordado encontrado</Text>
        </SpacedContainer>
      ) : null}

      {loading ? <CircleLoading light /> : null}
    </Drawer>
  )
}
