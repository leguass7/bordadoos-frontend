import { Container } from '~/components/Container'
import { EmbroideryTypeList } from '~/components/EmbroideryTypes/EmbroideryTypeList'
import { EmbroideryTypeSearch } from '~/components/EmbroideryTypes/EmbroideryTypesSearch'
import { LayoutAdmin } from '~/components/layouts/LayoutAdmin'
import { PageTitle } from '~/components/PageTitle'
import { PaginationProvider } from '~/components/Providers/PaginationProvider'

const Services: React.FC = () => {
  return (
    <LayoutAdmin>
      <PaginationProvider url="/embroidery/types">
        <Container>
          <PageTitle
            spotlight="Tipos"
            title="de bordados"
            description={'Tipos de bordados usado para incluir novo pedido.'}
          />
        </Container>
        <Container>
          <EmbroideryTypeSearch />
        </Container>
        <Container>
          <EmbroideryTypeList />
        </Container>
      </PaginationProvider>
    </LayoutAdmin>
  )
}

export default Services
