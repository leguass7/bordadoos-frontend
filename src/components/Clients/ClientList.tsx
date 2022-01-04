import { Client } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { Paragraph } from '../shared/web/src/styled'
import { ClientItemMemo } from './ClientItem'

import { Modal } from '@mui/material'

import { ModalForm } from '../ModalForm'
import { ClientForm } from './ClientForm'

interface Props {
  toggleModal: (id?: number) => void
  modal: { show: boolean; id: number }
}

export const ClientList: React.FC<Props> = ({ toggleModal, modal }) => {
  const { pagination, data, fetchMoreData, hasMore, refreshData } = usePagination<Client>()

  const handleEdit = useCallback(
    (id = 0) => {
      if (toggleModal) toggleModal(id)
      refreshData()
    },
    [toggleModal, refreshData]
  )

  const renderMessage = useCallback((text: string) => {
    return (
      <Paragraph align="center" themeColor="textDark">
        {text}
      </Paragraph>
    )
  }, [])

  return (
    <>
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
            return <ClientItemMemo key={`${item.id}`} {...item} showModal={modal.show} toggleModal={handleEdit} />
          })}
        </InfiniteScroll>
      </div>
      <Modal open={modal.show} onClose={toggleModal}>
        <div>
          <ModalForm title={`${modal.id ? 'Alterar' : 'Adicionar'} cliente`}>
            <ClientForm clientId={modal.id} onCancel={toggleModal} onSuccess={handleEdit} />
          </ModalForm>
        </div>
      </Modal>
    </>
  )
}
