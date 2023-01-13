import { useState } from 'react'

import type { NextPage } from 'next'

import { Add } from '@mui/icons-material'
import { Container, IconButton, Toolbar } from '@mui/material'

import { EmbroideryPositionList } from '~/components/EmbroideryPositions/EmbroideryPositionList'
import { EmbroideryPositionSearch } from '~/components/EmbroideryPositions/EmbroideryPositionSearch'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const PageAdminPosition: NextPage = () => {
  const [modal, setModal] = useState({ show: false, id: 0 })

  const handleToggleModal = (id = 0) => setModal(old => ({ id, show: !old.show }))

  return (
    <LayoutAdmin>
      <PaginationProvider url="/embroidery/types" initialFilter={{ positions: true }}>
        <Container>
          <PageTitle
            spotlight="Posições"
            title="dos bordados"
            description={'Posições onde ficarão os tipos de bordados'}
          >
            <Toolbar>
              <IconButton onClick={() => handleToggleModal()}>
                <Add />
              </IconButton>
            </Toolbar>
          </PageTitle>
        </Container>
        <Container>
          <EmbroideryPositionSearch />
        </Container>
        <Container>
          <EmbroideryPositionList modal={modal} toggleModal={handleToggleModal} />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default PageAdminPosition
