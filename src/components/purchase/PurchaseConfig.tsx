import { useCallback, useEffect, useMemo, useState } from 'react'

import { Card, Chip, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { PriceRules } from '@prisma/client'

import { useIsMounted } from '~/hooks/useIsMounted'
import { listPriceRules } from '~/services/api/priceRules'

import { CardTitle } from '../CardTitle'
import { CircleLoading } from '../CircleLoading'
import { SpacedContainer } from '../styled'
import { usePurchase } from './PurchaseProvider'

interface Props {
  children?: React.ReactNode
  purchaseId?: number
}

export const PurchaseConfig: React.FC<Props> = ({ purchaseId }) => {
  const [rules, setRules] = useState<Partial<PriceRules>[]>([])
  const { rulesSelected, setRulesSelected } = usePurchase()

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await listPriceRules()

    if (isMounted()) {
      setLoading(false)
      setRules(response?.data ?? [])
    }
  }, [isMounted])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const hasInSelected = useCallback(
    (id: number) => {
      const found = rulesSelected.find(s => s?.id === id)
      return found
    },
    [rulesSelected]
  )

  const notAddedRules = useMemo(() => {
    return rules.filter(rule => {
      const hasSelected = hasInSelected(rule.id)
      if (!hasSelected) return rule
    })
  }, [rules, hasInSelected])

  const handleAddRule = useCallback(
    (value: string) => {
      const id = parseInt(value)

      const hasSelected = hasInSelected(id)
      if (!hasSelected) {
        const found = notAddedRules.find(rule => rule?.id === id)
        if (found) setRulesSelected(old => [...old, found])
      }
    },
    [notAddedRules, hasInSelected, setRulesSelected]
  )

  const handleDelete = useCallback(
    (id: number) => () => {
      setRulesSelected(old => old.filter(rule => rule?.id !== id))
    },
    [setRulesSelected]
  )

  return (
    <Card>
      <CardTitle title="Adicionais" divider />
      <SpacedContainer>
        <Grid container direction="column">
          <Grid item py={1}>
            <FormControl fullWidth>
              <InputLabel id="add-rules">Adições</InputLabel>
              <Select
                labelId="add-rules"
                label="Adicionar regras"
                onChange={e => handleAddRule(e.target?.value as string)}
              >
                {notAddedRules?.length
                  ? notAddedRules.map(({ id, label }) => {
                      return (
                        <MenuItem key={id} value={id}>
                          {label}
                        </MenuItem>
                      )
                    })
                  : null}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {rulesSelected?.length
              ? rulesSelected.map(({ id, label }) => {
                  return (
                    <Chip sx={{ ml: 1, mb: 1 }} onDelete={handleDelete(id)} color="primary" key={id} label={label} />
                  )
                })
              : null}
          </Grid>
        </Grid>
      </SpacedContainer>
      {loading ? <CircleLoading /> : null}
    </Card>
  )
}
