import { useCallback, useRef, useState } from 'react'

import { Button, Grid, Typography } from '@mui/material'
import { FormHandles, Scope } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'

import { Field } from '~/components/Form/Field'
import { validateFormData } from '~/helpers/form'

interface Props {
  children?: React.ReactNode
}

const schema = Yup.object({
  retail: Yup.object({
    maxQtd: Yup.number()
      .required('Campo obrigatório')
      .integer('A quantidade deve ser um número inteiro')
      .min(0, 'A quantidade não pode ser um número negativo'),
    priceBelowJokerPoints: Yup.number(),
    pricePerThousandPoints: Yup.number()
  }),
  wholesale: Yup.object({
    pricePerThousandPoints: Yup.number()
  })
})

interface FormData {
  retail: {
    maxQtd: number
    priceBelowJokerPoints: number
    pricePerThousandPoints: number
  }
  wholesale: {
    pricePerThousandPoints: number
  }
}

export const PurchaseSettingsForm: React.FC<Props> = () => {
  const formRef = useRef<FormHandles>(null)
  const [maxQtd, setmaxQtd] = useState(0)

  const handleSubmit = async (values: FormData) => {
    const isInvalid = await validateFormData(schema, values, formRef.current)
    if (isInvalid) return null

    console.log('Atualizar configurações com os seguintes dados:', values)
  }

  const updateMaxQtd = useCallback(e => {
    const value = e.target?.value || 0
    setmaxQtd(value)
  }, [])

  return (
    <Form ref={formRef} onSubmit={handleSubmit}>
      <Grid container pb={2}>
        <Scope path="retail">
          <Typography variant="h5">Varejo</Typography>
          <Grid container>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Field label="Quantidade máxima para varejo" onChange={updateMaxQtd} name="maxQtd" number int />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Field label="Preço até 10000 pontos" name="priceBelowJokerPoints" number />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={4}>
              <Field label="R$ Adicional a cada 10000 pontos" name="pricePerThousandPoints" number />
            </Grid>
          </Grid>
        </Scope>
      </Grid>
      <Scope path="wholesale">
        <Typography variant="h5">
          Atacado
          <Typography variant="caption">
            {' '}
            ( {'\u003e'} {maxQtd} peças )
          </Typography>
        </Typography>
        <Field label="Preço a cada 1000 pontos" name="pricePerThousandPoints" number />
      </Scope>
      <Grid container justifyContent="flex-end" py={2} px={1}>
        <Button variant="contained" type="submit">
          Enviar
        </Button>
      </Grid>
    </Form>
  )
}
