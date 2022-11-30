import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { Button, Typography } from '@mui/material'

import { LayoutCenter } from '~/components/layouts/LayoutCenter'

interface Props {}

const Settings: NextPage<Props> = () => {
  const { back } = useRouter()

  return (
    <LayoutCenter>
      <Typography variant="h3">Configurações</Typography>
      <br />
      <div style={{ textAlign: 'center' }}>
        <Button color="info" onClick={() => back()}>
          Voltar
        </Button>
      </div>
    </LayoutCenter>
  )
}

export default Settings
