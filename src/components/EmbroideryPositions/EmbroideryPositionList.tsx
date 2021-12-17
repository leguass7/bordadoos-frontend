import { EmbroideryPosition } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { EmbroideryPositionItemMemo } from './EmbroideryPositionItem'

import { Modal } from '@mui/material'

import { ModalForm } from '../ModalForm'
import { EmbroideryPositionForm } from './EmbroideryPositionForm'

interface Props {
  toggleModal: (id?: number) => void
  modal: { show: boolean; id: number }
}

export const EmbroideryPositionList: React.FC<Props> = ({ toggleModal, modal }) => {
  const { pagination, data, fetchMoreData, hasMore, refreshData } = usePagination<EmbroideryPosition>()

  const handleEdit = useCallback(
    (id = 0) => {
      if (toggleModal) toggleModal(id)
      refreshData()
    },
    [toggleModal, refreshData]
  )

  // const renderMessage = useCallback((text: string) => {
  //   return (
  //     <Paragraph align="center" themeColor="textDark">
  //       {text}
  //     </Paragraph>
  //   )
  // }, [])

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
      >
        <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '0 auto', width: '100%' }}>
          {data?.map?.(item => {
            return (
              <EmbroideryPositionItemMemo
                key={`${item.id}`}
                {...item}
                showModal={modal.show}
                toggleModal={handleEdit}
              />
            )
          })}
        </div>
      </InfiniteScroll>
      <Modal open={modal.show} onClose={toggleModal}>
        <div>
          <ModalForm title={`${modal.id ? 'Editar' : 'Adicionar'} posição do bordado`}>
            <EmbroideryPositionForm embPosId={modal.id} onCancel={toggleModal} onSuccess={handleEdit} />
          </ModalForm>
        </div>
      </Modal>
    </div>
  )
}
