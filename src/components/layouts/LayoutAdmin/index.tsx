import { useSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { useRef, useState, useEffect } from 'react'

import { CircleLoading } from '~/components/CircleLoading'
import { Header } from '~/components/Header'
import { useWindowDimensions } from '~/hooks/useWindowDimensions'

import { LayoutBar, LayoutContainer, LayoutContent, LayoutFooter } from './styles'

export const LayoutAdmin: React.FC = ({ children }) => {
  const { replace } = useRouter()
  const [session] = useSession()
  const { height } = useWindowDimensions()
  const [maxHeight, setMaxH] = useState(`${height ? `${height}px` : 'auto'}`)
  const refBar = useRef<HTMLDivElement>(null)
  const refFoot = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (refBar.current && refFoot.current) {
      const bH = refBar.current.clientHeight
      const fH = refFoot.current.clientHeight
      setMaxH(`${height - bH - fH}px`)
    }
  }, [height])

  useEffect(() => {
    if (!session || !session?.user?.name) replace('/')
  }, [session, replace])

  if (!session) return <CircleLoading size={44} description="autorizando" />

  return (
    <LayoutContainer>
      <LayoutBar ref={refBar}>
        <Header />
      </LayoutBar>
      <LayoutContent id="layout-container" containerHeight={maxHeight}>
        {children}
      </LayoutContent>
      <LayoutFooter ref={refFoot}></LayoutFooter>
    </LayoutContainer>
  )
}
