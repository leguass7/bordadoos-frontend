import { Menu } from '@mui/icons-material'
import { SwipeableDrawer, DrawerProps, Divider, IconButton, List } from '@mui/material'
import React, { useCallback, useState } from 'react'

import { ItemMenu, ItemMenuProps } from './ItemMenu'
import { ButtonContainer } from './styles'

const mockItems: ItemMenuProps[] = [
  { path: '/admin', label: 'Novo pedido', description: 'Incluir novo pedido' },
  { path: '/admin/purchases', label: 'Pedidos', description: 'Lista de pedidos cadastrados' },
  { path: '/admin/users', label: 'Usuários', description: 'Lista de usuários cadastrados' },
  { path: '/admin/clients', label: 'Clientes', description: 'Lista de clientes cadastrados' },
  { path: '/admin/services', label: 'Tipos de bordados', description: 'Tipos de bordados cadastrados' }
]
interface Props {
  anchor?: DrawerProps['anchor']
}

export const ToolButtonMenu: React.FC<Props> = ({ anchor }) => {
  const [open, setOpen] = useState(false)

  const toggleDrawer = useCallback(
    (force?: boolean) => () => {
      setOpen(old => force ?? !old)
    },
    []
  )

  return (
    <>
      {open ? null : (
        <IconButton edge="start" style={{ color: '#f1f1f1' }} onClick={toggleDrawer(true)}>
          <Menu />
        </IconButton>
      )}
      <SwipeableDrawer
        role="presentation"
        anchor={anchor}
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <ButtonContainer>
          <Divider style={{ margin: '0 auto' }} />
          <List>{mockItems ? mockItems.map(item => <ItemMenu key={`item-${item.path}`} {...item} />) : null}</List>
        </ButtonContainer>
      </SwipeableDrawer>
    </>
  )
}
