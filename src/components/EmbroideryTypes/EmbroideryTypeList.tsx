import { EmbroideryType } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { EmbroideryTypeItemMemo } from './EmbroideryTypeItem'

import { Modal } from '@mui/material'

import { ModalForm } from '../ModalForm'
import { EmbroideryTypeForm } from './EmbroideryTypeForm'

interface Props {
  toggleModal: (id?: number) => void
  modal: { show: boolean; id: number }
}

export const EmbroideryTypeList: React.FC<Props> = ({ toggleModal, modal }) => {
  const { pagination, data, fetchMoreData, hasMore, refreshData } = usePagination<EmbroideryType>()

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
        <div style={{ display: 'flex', flexFlow: 'row wrap', padding: 4 }}>
          {data?.map?.(item => {
            return (
              <EmbroideryTypeItemMemo key={`${item.id}`} {...item} showModal={modal.show} toggleModal={handleEdit} />
            )
          })}
        </div>
      </InfiniteScroll>
      <Modal open={modal.show} onClose={toggleModal}>
        <div>
          <ModalForm title={`${modal.id ? 'Editar' : 'Adicionar'} tipo de bordado`}>
            <EmbroideryTypeForm embTypeId={modal.id} onCancel={toggleModal} onSuccess={handleEdit} />
          </ModalForm>
        </div>
      </Modal>
    </div>
  )
}
