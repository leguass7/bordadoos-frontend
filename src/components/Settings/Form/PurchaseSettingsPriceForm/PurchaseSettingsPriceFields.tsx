import { memo } from 'react'

import { Close } from '@mui/icons-material'
import { Grid, IconButton, Tooltip } from '@mui/material'
import { PriceRuleModality, PriceRuleType } from '@prisma/client'
import { Scope } from '@unform/core'

import { Field } from '~/components/Form/Field'
import Select, { SelectItem } from '~/components/Form/Select'

interface Props {
  index: number
  onRemove?: (id: number) => void
}

const ruleTypeItems: SelectItem[] = [
  { label: 'Valor percentual', value: PriceRuleType.PERC },
  { label: 'Valor fixo', value: PriceRuleType.FIXED }
]

const ruleModalityItems: SelectItem[] = [
  { label: 'sobre o preço total', value: PriceRuleModality.PRICE },
  { label: 'sobre cada peça do pedido', value: PriceRuleModality.QUANTITY }
]

export interface PurchaseSettingsPriceFormData {
  modality: PriceRuleModality
  type: PriceRuleType
  value: number
  label: string
}

const PurchaseSettingsPriceFieldsComponent: React.FC<Props> = ({ index, onRemove }) => {
  return (
    <Grid container>
      <Grid item flex={1}>
        <Scope path={`scopes[${index}]`}>
          <Grid container>
            <Grid item xs={12} sm={6} md={3}>
              <Field name="label" label="Nome da regra" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select label="Tipo" name="type" items={ruleTypeItems} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Select label="Modalidade" name="modality" items={ruleModalityItems} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Field name="value" number label="Valor" />
            </Grid>
          </Grid>
        </Scope>
      </Grid>
      <Grid item height="60px">
        <Grid container ml={1} height="100%" alignItems="center" justifyContent="center">
          <Tooltip placement="right" title="Remover regra">
            <IconButton onClick={() => onRemove(index)} color="error">
              <Close />
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    </Grid>
  )
}

export const PurchaseSettingsPriceFields = memo(PurchaseSettingsPriceFieldsComponent)
