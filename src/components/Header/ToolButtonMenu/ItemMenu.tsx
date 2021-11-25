import { Divider, ListItem, ListItemText } from '@mui/material'
import { useRouter } from 'next/dist/client/router'
import React, { useCallback, useEffect, useMemo } from 'react'

export type ItemMenuProps = {
  path: string
  label?: string
  description?: string
  onClose?: () => Promise<void>
  noMenu?: boolean
  onClick?: () => void
}

export const ItemMenu: React.FC<ItemMenuProps> = ({ path, label, description, onClose, noMenu, onClick }) => {
  const { asPath, push, prefetch } = useRouter()

  const actived = useMemo(() => !!(asPath && asPath === path && path !== '/'), [path, asPath])

  const handleLinkClick = useCallback(() => {
    if (onClose) {
      onClose().then(() => push(path))
    } else {
      push(path)
    }
  }, [onClose, path, push])

  useEffect(() => {
    if (path) prefetch(path)
  }, [prefetch, path])

  if (noMenu) return null

  return (
    <>
      <ListItem button disabled={actived} onClick={onClick || handleLinkClick}>
        <ListItemText primary={label} secondary={description} />
      </ListItem>
      <Divider light />
    </>
  )
}
