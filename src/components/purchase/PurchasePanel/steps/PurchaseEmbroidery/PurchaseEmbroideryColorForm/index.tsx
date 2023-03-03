import { useCallback, useEffect, useRef, useState } from 'react'

import { Button, Grid } from '@mui/material'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'

import { PurchaseEmbroideryColor, usePurchasePanelContext } from '../../../PurchasePanelProvider'
import { PurchaseEmbroideryColorFormScope } from './PurchaseEmbroideryColorFormScope'

interface FormData {
  colors: PurchaseEmbroideryColor[]
}

const hasValues = ({ colors, label }: PurchaseEmbroideryColor) => !!(colors && label)
const addIds = (color: PurchaseEmbroideryColor, index: number) => ({ ...color, id: index + 1 })

interface Props {
  onSuccess?: () => void
}

export const PurchaseEmbroideryColorForm: React.FC<Props> = ({ onSuccess }) => {
  const { embroidery, changeEmbroidery } = usePurchasePanelContext()

  const formRef = useRef<FormHandles>(null)

  const [scopes, setScopes] = useState([])
  const [updated, setUpdated] = useState(false)

  const handleAddScope = useCallback((colorQtd = 1) => {
    const qtd = typeof colorQtd === 'number' ? colorQtd : 1

    setScopes(old => {
      return [...old, [, old.length, qtd]]
    })
  }, [])

  const updateForm = useCallback(() => {
    const colors = embroidery?.colors

    if (!scopes?.length) handleAddScope()
    if (!colors) return null

    const diffSize = colors?.length - scopes?.length

    if (diffSize > 0) {
      for (let i = 0; i < diffSize; i++) {
        const colorsQtd = colors?.[i]?.colors?.length || 1
        handleAddScope(colorsQtd)
      }
    }

    if (!diffSize) {
      setUpdated(true)
      formRef.current.setData({ colors })
    }
  }, [embroidery, handleAddScope, scopes])

  useEffect(() => {
    if (!updated) updateForm()
  }, [updateForm, updated])

  const forceUpdate = useCallback(() => {
    setUpdated(false)
  }, [])

  const handleRemove = useCallback((id: number, index: number) => {
    setScopes(old => old.filter(([, i]) => i !== index))
  }, [])

  const handleSubmit = async (data: FormData) => {
    const colors = data?.colors?.filter(hasValues).map(addIds) ?? []

    changeEmbroidery({ colors })
    onSuccess?.()
  }

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Button variant="outlined" onClick={handleAddScope}>
          Adicionar mais cores
        </Button>
        <br />
        <br />
        {scopes?.map(([id, index, colorQtd]) => {
          const itemId = id || index + 1

          return (
            <PurchaseEmbroideryColorFormScope
              id={id}
              forceUpdate={forceUpdate}
              colorQtd={colorQtd}
              onRemove={handleRemove}
              key={`scope-${index}-${itemId}`}
              index={index}
            />
          )
        })}
        <Grid container p={2} justifyContent="flex-end" alignItems="center">
          <Button variant="contained" type="submit">
            Salvar
          </Button>
        </Grid>
      </Form>
    </>
  )
}
