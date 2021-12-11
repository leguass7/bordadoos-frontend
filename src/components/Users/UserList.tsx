import { User } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { Paragraph } from '../shared/web/src/styled'
import { UserItemMemo } from './UserItem'

interface Props {}

export const UserList: React.FC<Props> = () => {
  const { pagination, data, fetchMoreData, hasMore } = usePagination<User>()

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
          return <UserItemMemo key={`${item.id}`} {...item} />
        })}
      </InfiniteScroll>
    </div>
  )
}
