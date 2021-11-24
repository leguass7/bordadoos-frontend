import { Button } from '@mui/material'
import { FaGoogle } from 'react-icons/fa'
import React from 'react'

export const Signin: React.FC = () => {
  return (
    <Button variant="outlined" color="primary" startIcon={<FaGoogle />}>
      LOGIN COM GOOGLE
    </Button>
  )
}
