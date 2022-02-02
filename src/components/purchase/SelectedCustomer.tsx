import React, { useCallback, useEffect, useState } from 'react'

import { Fade } from '@mui/material'
import type { Client } from '@prisma/client'

import { Text, Span } from '../styled'

type Props = {
  customerId: number
}
export const SelectedCustomer: React.FC<Props> = ({ customerId }) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<Client>>(null)

  const fetchCustomer = useCallback(async () => {
    console.log('customerId', customerId)
  }, [customerId])

  useEffect(() => {
    fetchCustomer()
  }, [fetchCustomer])

  return (
    <Fade in={!loading}>
      <Text>
        Nome: <Span>{data?.name || '--'}</Span>
      </Text>
    </Fade>
  )
}
