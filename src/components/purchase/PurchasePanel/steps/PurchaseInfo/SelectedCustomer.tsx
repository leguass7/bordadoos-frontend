import React, { useCallback, useEffect, useState } from 'react'

import { Fade } from '@mui/material'
import type { Client } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { FlexContainer, Span, Text } from '~/components/styled'
import { useIsMounted } from '~/hooks/useIsMounted'
import { getCustomer } from '~/services/api/customer'

type Props = {
  customerId: number
}

export const SelectedCustomer: React.FC<Props> = ({ customerId }) => {
  const isMounted = useIsMounted()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<Partial<Client>>(null)

  const fetchCustomer = useCallback(async () => {
    setLoading(true)
    const response = await getCustomer(customerId)
    if (isMounted()) {
      setLoading(false)
      if (response?.success) {
        setData(response?.client)
      }
    }
  }, [customerId, isMounted])

  useEffect(() => {
    let active = true
    if (active) fetchCustomer()

    return () => {
      active = false
    }
  }, [fetchCustomer])

  return (
    <>
      <Fade in={!!(!loading && data)}>
        <div>
          <Text bold themeColor="primary">
            Nome: <Span>{data?.name || '--'}</Span>
          </Text>
          <FlexContainer spaced>
            <Text bold themeColor="primary">
              Telefones:
              <br />
              <Span>{data?.phone || '--'}</Span>
              <br />
              <Span>{data?.phone2 || '--'}</Span>
            </Text>
            <Text bold themeColor="primary">
              Documento:
              <br />
              <Span>{data?.doc || '--'}</Span>
            </Text>
          </FlexContainer>
        </div>
      </Fade>
      {loading ? <CircleLoading light /> : null}
    </>
  )
}
