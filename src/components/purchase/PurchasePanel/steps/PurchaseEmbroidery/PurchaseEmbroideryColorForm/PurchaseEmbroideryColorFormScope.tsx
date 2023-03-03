import { useCallback, useEffect, useState } from 'react'

import { Add, Close } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Scope } from '@unform/core'

import { Field } from '~/components/Form/Field'

interface Props {
  index: number
  id: number
  onRemove?: (id: number, index: number) => void
  colorQtd?: number
  forceUpdate?: () => void
}

export const PurchaseEmbroideryColorFormScope: React.FC<Props> = ({
  index,
  onRemove,
  id,
  colorQtd = 1,
  forceUpdate
}) => {
  const [colors, setColors] = useState([])
  const [updated, setUpdated] = useState(false)

  const handleAddColor = useCallback(() => {
    setColors(old => {
      return [...old, [, old.length]]
    })
  }, [])

  const addColorFields = useCallback(() => {
    const diffSize = colorQtd - colors?.length

    if (diffSize > 0) {
      for (let i = 0; i < colorQtd; i++) handleAddColor()
    }

    if (!colorQtd && !colors?.length) handleAddColor()

    if (!diffSize) {
      setUpdated(true)
      forceUpdate?.()
    }
  }, [colorQtd, handleAddColor, forceUpdate, colors])

  useEffect(() => {
    if (!updated) addColorFields()
  }, [addColorFields, updated])

  return (
    <Grid container>
      <Grid item flex={1}>
        <Scope path={`colors[${index}]`}>
          <Grid container>
            <Grid item xs={10}>
              <Grid container alignItems="center" justifyContent="flex-start">
                <Grid item flex={1}>
                  <Field name="label" label="Nome da palheta de cores" />
                </Grid>
                <Tooltip placement="right" title="Remover cor">
                  <IconButton onClick={() => onRemove(id, index)} color="error">
                    <Close />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-start" flexWrap="wrap">
                {colors?.map?.(([colorId, colorIndex], index) => {
                  return (
                    <Field
                      key={`scope-${id}-color-${colorId}`}
                      sx={{ width: 120 }}
                      name={`colors[${index}]`}
                      label={`Cor ${index + 1} `}
                    />
                  )
                })}
                <IconButton onClick={handleAddColor}>
                  <Add />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Scope>
      </Grid>
      <Grid item height="64px"></Grid>
    </Grid>
  )
}
