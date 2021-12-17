import { Menu } from '@mui/icons-material'
import { SwipeableDrawer, DrawerProps, Divider, IconButton, List, Typography, Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'

import { ItemMenu, ItemMenuProps } from './ItemMenu'
import { ButtonContainer, UserContainer } from './styles'

const mockItems: ItemMenuProps[] = [
  { path: '/admin', label: 'Novo pedido', description: 'Incluir novo pedido' },
  { path: '/admin/purchases', label: 'Pedidos', description: 'Lista de pedidos cadastrados' },
  { path: '/admin/users', label: 'Usuários', description: 'Lista de usuários cadastrados' },
  { path: '/admin/clients', label: 'Clientes', description: 'Lista de clientes cadastrados' },
  { path: '/admin/services', label: 'Tipos de bordados', description: 'Tipos de bordados cadastrados' },
  { path: '/admin/position', label: 'Posições dos bordados', description: 'Posições dos bordados cadastrados' }
]

interface Props {
  anchor?: DrawerProps['anchor']
}

export const ToolButtonMenu: React.FC<Props> = ({ anchor }) => {
  const [open, setOpen] = useState(false)
  const [session] = useSession()
  const { push, pathname } = useRouter()

  const user = useMemo(() => session?.user || {}, [session])

  const redirectAccount = () => () => {
    if (pathname !== '/admin/account') push('/admin/account')
  }

  const toggleDrawer = useCallback(
    (force?: boolean) => () => {
      setOpen(old => force ?? !old)
    },
    []
  )

  return (
    <>
      <IconButton edge="start" style={{ color: '#f1f1f1' }} onClick={toggleDrawer(true)}>
        <Menu />
      </IconButton>
      <UserContainer onClick={redirectAccount()}>
        <Avatar sx={{ bgcolor: blue[500] }} alt={user.name} src={user.image} />
        <Typography variant="h6" color="GrayText" align="center" justifySelf="center" pl={1}>
          {user.name}
        </Typography>
      </UserContainer>
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
