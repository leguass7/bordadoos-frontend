import { Add } from '@mui/icons-material'
import { IconButton, Toolbar } from '@mui/material'
import { useState } from 'react'

import { Container } from '~/components/Container'
import { EmbroideryTypeList } from '~/components/EmbroideryTypes/EmbroideryTypeList'
import { EmbroideryTypeSearch } from '~/components/EmbroideryTypes/EmbroideryTypesSearch'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const Services: React.FC = () => {
  const [modal, setModal] = useState({ show: false, id: 0 })

  const handleToggleModal = (id = 0) => setModal(old => ({ id, show: !old.show }))

  return (
    <LayoutAdmin>
      <PaginationProvider url="/embroidery/types">
        <Container>
          <PageTitle
            spotlight="Tipos"
            title="de bordados"
            description={'Tipos de bordados usado para incluir novo pedido.'}
          >
            <Toolbar>
              <IconButton onClick={() => handleToggleModal()}>
                <Add />
              </IconButton>
            </Toolbar>
          </PageTitle>
        </Container>
        <Container>
          <EmbroideryTypeSearch />
        </Container>
        <Container>
          <EmbroideryTypeList modal={modal} toggleModal={handleToggleModal} />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default Services
