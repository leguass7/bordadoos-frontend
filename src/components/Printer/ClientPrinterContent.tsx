import { Grid, Table, TableHead, TableRow, Typography, TableCell, TableBody, Divider } from '@mui/material'
import { PriceRules } from '@prisma/client'

import { formatPrice } from '~/helpers'
import { formatDoc } from '~/helpers/string'
import { PurchaseWithItems } from '~/services/api/purchase'

interface Props {
  purchase: PurchaseWithItems
  rules?: PriceRules[]
}

export const ClientPrinterContent: React.FC<Props> = ({ purchase, rules }) => {
  // originalValue with development price included
  const totalOriginalValue = purchase?.purchaseItem?.[0].originalValue || 0
  const originalValue = totalOriginalValue - purchase?.developmentPrice

  const unityValue = purchase?.unityValue || originalValue / purchase.qtd

  return (
    <>
      <Grid justifyContent="space-between" container>
        {purchase?.type?.label && purchase?.category?.label ? (
          <>
            <Typography variant="h6" noWrap>
              {purchase.type.label} {'>'} {purchase.category.label}
            </Typography>
            <br />
          </>
        ) : null}
        <Typography component="span" width="100%" whiteSpace="pre-line" variant="h5">
          {purchase.label}
        </Typography>
      </Grid>
      <Grid container border={1} p={1} width="100%">
        <Grid item xs={12}>
          <Typography variant="h6">Cliente</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="caption" pr={2}>
            Código:
          </Typography>
          <Typography variant="caption">{purchase?.client?.id}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="caption" pr={2}>
            CPF/CNPJ:
          </Typography>
          <Typography variant="caption">{formatDoc(purchase?.client?.doc)}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" pr={2}>
            Nome:
          </Typography>
          <Typography variant="caption">{purchase?.client?.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="caption" pr={2}>
            Telefone(s):
          </Typography>
          {purchase?.client?.phone ? <Typography variant="caption">{purchase?.client?.phone}</Typography> : null}
          {purchase?.client?.phone2 ? <Typography variant="caption">, {purchase?.client?.phone2}</Typography> : null}
        </Grid>
      </Grid>

      <Grid container pt={1}>
        <Grid container border={1} p={1} width="100%">
          <Grid item xs={12}>
            <Typography variant="h6">Pagamento</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="caption" pr={2}>
              Qtd:
            </Typography>
            <Typography variant="caption">{purchase?.qtd}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" pr={2}>
              Preço:
            </Typography>
            <Typography variant="caption">{formatPrice(unityValue)}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="caption" pr={2}>
              Taxa de desenvolvimento:
            </Typography>
            <Typography variant="caption">{formatPrice(purchase?.developmentPrice)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="caption" pr={2}>
              Total:
            </Typography>
            <Typography variant="caption">{formatPrice(purchase?.value)}</Typography>
          </Grid>
        </Grid>

        <Grid container pt={1}>
          <Grid item xs={12}>
            <Grid container border={1} p={1}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6">Pedido</Typography>
                </Grid>
                <Typography variant="body2" component="span" pr={2}>
                  Vendedor:
                </Typography>
                <Typography variant="body2" component="span">
                  {purchase?.createdUser?.id} - {purchase?.createdUser?.name}
                </Typography>
              </Grid>

              {purchase?.description ? (
                <Grid item xs={12}>
                  <Typography variant="body2" component="span" pr={2}>
                    Descrição:
                  </Typography>
                  <Typography variant="body2" component="span">
                    {purchase.description}
                  </Typography>
                </Grid>
              ) : null}

              {purchase?.clientObs ? (
                <Grid item xs={12}>
                  <Typography variant="caption" pr={2}>
                    Observações:
                  </Typography>
                  <Typography variant="caption">{purchase.clientObs}</Typography>
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>

        {rules?.length ? (
          <Grid container pt={1} alignItems="stretch">
            <Grid item xs={12}>
              <Typography align="center" variant="h6">
                Adicionais
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Valor</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rules?.map?.(({ id, label, value, type }) => {
                    return (
                      <TableRow key={`rule-${id}`}>
                        <TableCell>{label}</TableCell>
                        <TableCell>{type === 'FIXED' ? 'Fixo' : 'Percentual'}</TableCell>
                        <TableCell>{type === 'FIXED' ? formatPrice(value) : `${value}`.concat('%')}</TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        ) : null}
      </Grid>
    </>
  )
}
