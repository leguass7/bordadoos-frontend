import { useCallback, useEffect, useMemo, useState } from 'react'

import { Card, Chip, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import { PriceRules } from '@prisma/client'

import { CardTitle } from '~/components/CardTitle'
import { CircleLoading } from '~/components/CircleLoading'
import { SpacedContainer } from '~/components/styled'
import { useIsMounted } from '~/hooks/useIsMounted'
import { listPriceRules } from '~/services/api/priceRules'
import { getPurchaseConfig } from '~/services/api/purchase-config'

import { usePurchasePanelContext } from '../../PurchasePanelProvider'

interface Props {
  purchaseId?: number
}

export const SelectPurchaseRules: React.FC<Props> = ({ purchaseId }) => {
  const [rules, setRules] = useState<Partial<PriceRules>[]>([])
  const { priceRules, setPriceRules, info } = usePurchasePanelContext()

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  // se adicionar uma regra, remove-la e adiciona-la denovo, precisamos renderizar o select novamente para que o onChange funcione
  const [removed, setRemoved] = useState(false)

  const fetchSelected = useCallback(async () => {
    if (!purchaseId || !priceRules?.length) return null

    setLoading(true)
    const response = await getPurchaseConfig({ purchaseId })
    const responseRules = response?.data?.priceRules
    if (isMounted()) {
      setLoading(false)
      if (responseRules?.length) setPriceRules(responseRules)
    }
  }, [purchaseId, isMounted, setPriceRules, priceRules?.length])

  useEffect(() => {
    fetchSelected()
  }, [fetchSelected])

  const fetchData = useCallback(async () => {
    setLoading(true)
    const response = await listPriceRules({})

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
      const found = priceRules?.find?.(s => s?.id === id)
      return found
    },
    [priceRules]
  )

  const notAddedRules = useMemo(() => {
    return rules.filter(rule => {
      const hasSelected = hasInSelected(rule.id)
      if (!hasSelected) return rule
    })
  }, [rules, hasInSelected])

  const handleAddRule = useCallback(
    (value: string) => {
      setRemoved(false)
      const id = parseInt(value)

      const hasSelected = hasInSelected(id)
      if (!hasSelected) {
        const found = notAddedRules.find(rule => rule?.id === id)
        if (found) setPriceRules(old => [...old, found])
      }
    },
    [notAddedRules, hasInSelected, setPriceRules]
  )

  const handleDelete = useCallback(
    (id: number) => () => {
      setPriceRules(old => old.filter(rule => rule?.id !== id))
      setRemoved(true)
    },
    [setPriceRules]
  )

  return (
    <Card>
      <CardTitle title={`Adicionais - ${info?.name}`} divider />
      <SpacedContainer>
        <Grid container direction="column">
          <Grid item py={1}>
            <FormControl fullWidth>
              <InputLabel id="add-rules">Regras adicionais</InputLabel>
              <Select
                labelId="add-rules"
                defaultValue=""
                key={`select-purchase-rules-${removed ? '1' : '0'}`}
                label="Adicionar regras"
                onChange={e => handleAddRule(e.target?.value as string)}
              >
                {rules?.length ? (
                  rules.map(({ id, label }) => {
                    const isSelected = hasInSelected(id)

                    return (
                      <MenuItem key={id} value={id} disabled={!!isSelected}>
                        {label}
                      </MenuItem>
                    )
                  })
                ) : (
                  <MenuItem disabled>Nenhuma regra cadastrada</MenuItem>
                )}
              </Select>
            </FormControl>
          </Grid>
          <Grid item>
            {priceRules?.length
              ? priceRules?.map?.(({ id, label }) => {
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
