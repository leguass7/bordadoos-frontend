import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Container } from '@mui/material'
import { Prisma, Purchase } from '@prisma/client'

import { CircleLoading } from '../CircleLoading'
import { usePagination } from '../Providers/PaginationProvider'
import { Paragraph } from '../shared/web/src/styled'
import { PurchaseItem } from './PurchaseItem'

export type PurchaseWithRelations = Prisma.PurchaseGetPayload<{
  include: { category: true; client: true; type: true }
}>
// We are using select, so some fields could not me found

export const PurchaseList: React.FC = () => {
  const { data, hasMore, fetchMoreData, pagination } = usePagination<PurchaseWithRelations>()

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
        <div style={{ display: 'flex', flexFlow: 'row wrap', padding: 4 }}>
          {data?.map?.(item => {
            return <PurchaseItem key={`purchase-${item?.id}`} {...item} />
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}
