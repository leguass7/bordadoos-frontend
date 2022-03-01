import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Container } from '@mui/material'
import { Purchase } from '@prisma/client'

import { CircleLoading } from '../CircleLoading'
import { usePagination } from '../Providers/PaginationProvider'
import { Paragraph } from '../shared/web/src/styled'
import { PurchaseItem } from './PurchaseItem'

export const PurchaseList: React.FC = () => {
  const { data, hasMore, fetchMoreData, pagination } = usePagination<Purchase>()

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
          return <PurchaseItem key={`purchase-${item?.id}`} {...item} />
        })}
      </InfiniteScroll>
    </div>
  )
}
