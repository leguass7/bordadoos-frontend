import { useEffect, useRef } from 'react'

import type { NextPage } from 'next'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { useAppTheme } from '~/components/AppThemeProvider/useAppTheme'
import { CircleLoading } from '~/components/CircleLoading'
import { LayoutCenter } from '~/components/layouts/LayoutCenter'

const PageAdminLogout: NextPage = () => {
  const { theme } = useAppTheme()
  const ref = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { replace } = useRouter()

  useEffect(() => {
    if (ref.current && session) {
      signOut()
    } else {
      replace('/')
    }
  }, [session, replace])

  return (
    <LayoutCenter>
      <div ref={ref}></div>
      <CircleLoading color={theme.colors.secondary} size={28} />
    </LayoutCenter>
  )
}

export default PageAdminLogout
