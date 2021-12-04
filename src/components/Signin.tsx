import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/client'
import React, { useMemo } from 'react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import styled from 'styled-components'

type Props = {
  processing?: boolean
}

const providers = [
  { name: 'google', label: 'Login com o Google', Icon: <FaGoogle /> },
  { name: 'github', label: 'Login com o Github', Icon: <FaGithub /> }
]

export const Signin: React.FC<Props> = ({ processing }) => {
  const [session] = useSession()

  const items = useMemo(() => {
    const username = session && (session?.user?.name || 'Sair')
    return providers.map(({ name, label, Icon }) => ({
      onClick: session ? () => signOut() : () => signIn(name),
      label: session ? username : label,
      Icon
    }))
  }, [session])

  return (
    <LoginContainer>
      {items.map(({ onClick, label, Icon }) => {
        return (
          <div key={label} style={{ padding: 4 }}>
            <Button variant="outlined" color="primary" startIcon={Icon} onClick={onClick}>
              {`${label}${processing ? ' aguarde' : ''}`}
            </Button>
          </div>
        )
      })}
    </LoginContainer>
  )
}

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
`
