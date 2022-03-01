import React, { useCallback, useEffect, useMemo } from 'react'

import { useRouter } from 'next/dist/client/router'

import { IconButton } from '@mui/material'

type Props = {
  path?: string
  Icon?: any
  onClick?: () => void
}

export const HeaderButton: React.FC<Props> = ({ path, Icon, onClick }) => {
  const { prefetch, push, asPath } = useRouter()

  const actived = useMemo(() => !!(asPath && asPath === path), [path, asPath])

  const handleClick = useCallback(() => {
    if (path) push(path)
    else if (onClick) onClick()
  }, [path, onClick, push])

  useEffect(() => {
    if (path) prefetch(path)
  }, [prefetch, path])

  return (
    <IconButton onClick={handleClick} color="inherit" disabled={actived}>
      {Icon ? <Icon /> : null}
    </IconButton>
  )
}
