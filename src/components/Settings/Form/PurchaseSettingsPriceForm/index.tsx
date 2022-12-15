import { useCallback, useRef, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { CircleLoading } from '~/components/CircleLoading'

import { PurchaseSettingsPriceFields } from './PurchaseSettingsPriceFields'

interface Props {
  children?: React.ReactNode
}

export const PurchaseSettingsPriceForm: React.FC<Props> = () => {
  const formRef = useRef<FormHandles>(null)
  const [scopes, setScopes] = useState([0])

  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback(async (data: FormData) => {
    console.log(data)
  }, [])

  const handleAddScope = useCallback(() => {
    setScopes(old => [...old, old.length])
  }, [])

  const handleRemove = useCallback((id: number) => {
    setScopes(old => old.filter(i => i !== id))
  }, [])

  const handleRenderScopes = useCallback(() => {
    return scopes?.map(scope => {
      return <PurchaseSettingsPriceFields onRemove={handleRemove} key={`scope-${scope}`} index={scope} />
    })
  }, [scopes, handleRemove])

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        {handleRenderScopes()}
        <Grid container p={2}>
          <Button onClick={handleAddScope} fullWidth variant="outlined">
            Adicionar mais regras
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end" py={2} px={1}>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </Grid>
      </Form>
      {loading ? <CircleLoading /> : null}
    </>
  )
}
