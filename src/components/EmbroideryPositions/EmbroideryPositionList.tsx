import { EmbroideryPosition } from '.prisma/client'

import { usePagination } from '../Providers/PaginationProvider'

import { useCallback } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CircleLoading } from '../CircleLoading'
import { Container } from '../Container'
import { EmbroideryPositionItemMemo } from './EmbroideryPositionItem'

import { Grid, Modal, Typography } from '@mui/material'

import { ModalForm } from '../ModalForm'
import { EmbroideryPositionForm } from './EmbroideryPositionForm'

import { EmbTypeWithEmbPos } from '~/serverSide/embroideryTypes/embroideryType.dto'

interface Props {
  toggleModal: (id?: number) => void
  modal: { show: boolean; id: number }
}

export const EmbroideryPositionList: React.FC<Props> = ({ toggleModal, modal }) => {
  const { pagination, data, fetchMoreData, hasMore, refreshData } = usePagination<EmbTypeWithEmbPos>()

  const handleEdit = useCallback(
    (id = 0) => {
      if (toggleModal) toggleModal(id)
      refreshData()
    },
    [toggleModal, refreshData]
  )

  const renderPositions = useCallback(
    (positions: EmbroideryPosition[]) => {
      if (!positions?.length) return '---'

      return positions.map(position => {
        return (
          <EmbroideryPositionItemMemo
            key={`embroidery-position-${position.id}`}
            {...position}
            showModal={modal.show}
            toggleModal={handleEdit}
          />
        )
      })
    },
    [handleEdit, modal?.show]
  )

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
        <div>
          {data?.map?.(({ label, positions, id }) => {
            return (
              <div style={{ padding: '4px 0' }} key={`embroidery-type-${id}`}>
                <Typography variant="h5" pl={2}>
                  {label}
                </Typography>
                <div style={{ display: 'flex', flexFlow: 'row wrap', padding: 4 }}>{renderPositions(positions)}</div>
              </div>
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
