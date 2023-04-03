import { useCallback, useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Container } from '@mui/material'
import { Prisma } from '@prisma/client'

import { useHasAccess } from '~/hooks/useHasAccess'

import { CircleLoading } from '../CircleLoading'
import { usePagination } from '../Providers/PaginationProvider'
import { Paragraph } from '../shared/web/src/styled'
import { PurchaseItem } from './PurchaseItem'

export type PurchaseWithRelations = Prisma.PurchaseGetPayload<{
  include: { category: true; client: true; type: true; purchaseItem: true }
}>
// We are using select, so some fields could not me found

export const PurchaseList: React.FC = () => {
  const { data, hasMore, fetchMoreData, pagination } = usePagination<PurchaseWithRelations>()
  const isAdmin = useHasAccess(8)

  const renderMessage = useCallback((text: string) => {
    return (
      <Paragraph align="center" themeColor="textDark">
        {text}
      </Paragraph>
    )
  }, [])

  const container = useMemo(() => {
    return window?.document.getElementById('layout-container')
  }, [])

  return (
    <div>
      <InfiniteScroll
        dataLength={data.length}
        scrollableTarget={container}
        hasMore={!!hasMore}
        next={fetchMoreData}
        loader={
          <Container>
            {pagination.page > 1 ? <CircleLoading size={20} relative backgroundColor="#0000" /> : null}
          </Container>
        }
        endMessage={renderMessage('FIM')}
      >
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
            alignItems: 'flex-start',
            padding: 4,
            overflow: 'hidden'
          }}
        >
          {data?.map?.(item => {
            return <PurchaseItem key={`purchase-${item?.id}-${item?.deliveryDate}`} isAdmin={isAdmin()} {...item} />
          })}
        </div>
      </InfiniteScroll>
    </div>
  )
}
