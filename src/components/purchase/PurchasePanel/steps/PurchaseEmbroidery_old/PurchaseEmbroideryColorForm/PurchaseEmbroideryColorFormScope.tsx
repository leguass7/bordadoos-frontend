import { useCallback, useEffect, useState } from 'react'

import { Add, Close } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { Scope } from '@unform/core'

import { Field } from '~/components/Form/Field'

import { usePurchasePanelContext } from '../../../PurchasePanelProvider'

interface Props {
  id: string
}

export const PurchaseEmbroideryColorFormScope: React.FC<Props> = ({ id }) => {
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
                  const itemId = colorId || colorIndex + 1

                  return (
                    <Field
                      key={`scope-${id}-color-${itemId}`}
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
    </Grid>
  )
}
