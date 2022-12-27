import { useCallback, useEffect, useRef, useState } from 'react'

import type { NextPage } from 'next'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/dist/client/router'

import { CircleLoading } from '~/components/CircleLoading'
import { LayoutCenter } from '~/components/layouts/LayoutCenter'
import { Signin } from '~/components/Signin'
import { useIsMounted } from '~/hooks/useIsMounted'

const PageIndex: NextPage = () => {
  const isMounted = useIsMounted()
  const [loaded, setLoaded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const { replace, prefetch } = useRouter()

  const redirect = useCallback(async () => {
    if (loaded && session && session.user) {
      setProcessing(true)
      await prefetch('/admin')
      if (isMounted()) {
        setProcessing(false)
        replace('/admin')
      }
    }
  }, [session, replace, prefetch, loaded, isMounted])

  useEffect(() => {
    redirect()
  }, [redirect])

  useEffect(() => {
    if (!loaded && ref.current) {
      setLoaded(true)
    }
  }, [loaded])

  // console.log('PageIndex session', session)

  return (
    <LayoutCenter>
      <div ref={ref} />
      {loaded ? <Signin processing={!!processing} /> : <CircleLoading />}
    </LayoutCenter>
  )
}

export default PageIndex
