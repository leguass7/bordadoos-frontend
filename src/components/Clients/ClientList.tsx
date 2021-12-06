import { Client } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { Paragraph } from '../shared/web/src/styled'
import { ClientItem } from './ClientItem'

interface Props {
  modalChange: () => void
}

export const ClientList: React.FC<Props> = ({ modalChange }) => {
  const { pagination, data, fetchMoreData, hasMore } = usePagination<Client>()

  const renderMessage = useCallback((text: string) => {
    return (
      <Paragraph align="center" themeColor="textDark">
        {text}
      </Paragraph>
    )
  }, [])

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        scrollableTarget="layout-container"
        hasMore={!!hasMore}
        next={fetchMoreData}
        loader={
          <Container>
            {pagination.page > 1 ? <CircleLoading size={20} relative backgroundColor="#0000" /> : null}
          </Container>
        }
        endMessage={renderMessage('FIM')}
      >
        {data?.map?.(item => {
          return <ClientItem key={`${item.id}`} modalChange={modalChange} {...item} />
        })}
      </InfiniteScroll>
    </div>
  )
}
