import type { NextPage } from 'next'
import { LayoutCenter } from '~/components/layouts/LayoutCenter'
import { Signin } from '~/components/Signin'

const PageIndex: NextPage = () => {
  return (
    <LayoutCenter>
      <Signin />
    </LayoutCenter>
  )
}

export default PageIndex
