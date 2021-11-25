import { Button } from '@mui/material'
import { useSession, signIn, signOut } from 'next-auth/client'
import React, { useMemo } from 'react'
import { FaGoogle } from 'react-icons/fa'

type Props = {
  processing?: boolean
}

export const Signin: React.FC<Props> = ({ processing }) => {
  const [session] = useSession()

  const { onClick, label } = useMemo(() => {
    const name = session && (session?.user?.name || 'Sair')
    return {
      onClick: session ? () => signOut() : () => signIn('google'),
      label: session ? name : 'LOGIN COM O GOOGLE'
    }
  }, [session])

  return (
    <Button variant="outlined" color="primary" startIcon={<FaGoogle />} onClick={onClick}>
      {`${label}${processing ? ' aguarde' : ''}`}
    </Button>
  )
}
