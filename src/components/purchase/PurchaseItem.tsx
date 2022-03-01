import { memo, useCallback, useEffect, useState } from 'react'

import { CardActions, Switch, Typography } from '@mui/material'
import { Client, EmbroideryPosition, EmbroideryType, Purchase } from '@prisma/client'

import { useIsMounted } from '~/hooks/useIsMounted'
import { getDefault, putDefault } from '~/services/api'

import { CircleLoading } from '../CircleLoading'
import { CardItem } from '../ListItems/CardItem'
import { ItemLine, SwitchContainer } from './styles'

interface Props extends Purchase {}

const PurchaseItemComponent: React.FC<Props> = ({ ...props }) => {
  const { value = 0, done, paid, clientId, id, actived, typeId, categoryId } = props
  const [itemActived, setItemActived] = useState(actived)

  const [client, setClient] = useState<Partial<Client>>({})
  const [category, setCategory] = useState<Partial<EmbroideryPosition>>({})
  const [type, setType] = useState<Partial<EmbroideryType>>({})

  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)

  const fetchClient = useCallback(async () => {
    if (clientId) {
      setLoading(true)
      const { client, success } = await getDefault<{ client: Client }>(`/users/${clientId}`)
      if (isMounted.current) {
        setLoading(false)
        if (success) setClient(client)
      }
    }
  }, [isMounted, clientId])

  const fetchType = useCallback(async () => {
    if (typeId) {
      setLoading(true)
      const { data, success } = await getDefault<{ data: EmbroideryType }>(`/embroidery/types/${typeId}`)
      if (isMounted.current) {
        setLoading(false)
        if (success) setType(data)
      }
    }
  }, [isMounted, typeId])

  const fetchCategory = useCallback(async () => {
    if (categoryId) {
      setLoading(true)
      const { data, success } = await getDefault<{ data: EmbroideryPosition }>(`/embroidery/positions/${categoryId}`)
      if (isMounted.current) {
        setLoading(false)
        if (success) setCategory(data)
      }
    }
  }, [isMounted, categoryId])

  useEffect(() => {
    fetchClient()
    fetchType()
    fetchCategory()
  }, [fetchClient, fetchType, fetchCategory])

  const toggleActived = useCallback(
    async e => {
      if (id) {
        const newActived = e.target.checked
        setItemActived(newActived)

        setLoading(true)

        await putDefault(`/purchases/${id}`, { actived: newActived })
        if (isMounted.current) {
          setLoading(false)
        }
      }
    },
    [isMounted, id]
  )

  return (
    <>
      <CardItem spacing={4} width="33.33%">
        <ItemLine hideShadow>
          <Typography alignSelf="center" variant="h5" display="block">
            Ordem de serviço
          </Typography>
          <Typography alignSelf="center" variant="subtitle1" display="block">
            R$ {String(value).padEnd(4, ',00')}
          </Typography>
        </ItemLine>
        <ItemLine color="#dfdfdf">
          <Typography variant="h6">Informações do cliente:</Typography>
          <Typography component="span" pl={2}>
            nome: {client?.name ?? 'Não informado'}
          </Typography>
          <Typography component="span" pl={2}>
            telefone: {client?.phone ?? 'Não informado'}
          </Typography>
        </ItemLine>
        <ItemLine color="#dfdfdf">
          <Typography variant="h6">Informações do bordado:</Typography>
          <Typography component="span" pl={2}>
            Tipo do bordado: {type?.label ?? 'Não informado'}
          </Typography>
          <Typography component="span" pl={4}>
            {type?.description}
          </Typography>
          <Typography component="span" pl={2}>
            Posição do bordado: {category?.label ?? 'Não informado'}
          </Typography>
          <Typography component="span" pl={4}>
            {category?.description ?? 'Não informado'}
          </Typography>
        </ItemLine>
        <CardActions>
          <SwitchContainer>
            <Switch name="actived" checked={itemActived} color="info" onChange={toggleActived} disabled={loading} />
            <Typography pr={2} variant="caption" color="GrayText" htmlFor="actived" component="label">
              ativo
            </Typography>
          </SwitchContainer>
        </CardActions>
      </CardItem>
      {loading ? <CircleLoading /> : null}
    </>
  )
}

export const PurchaseItem = memo(PurchaseItemComponent)
