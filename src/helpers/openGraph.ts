import { OpenGraph } from 'next-seo/lib/types'

import logoFace from '~/assets/images/logo-face.png'
import { imageBase } from '~/config'

type OpenGraphParams = OpenGraph & { asPath?: string }
export const openGraph: OpenGraph = {
  url: `${imageBase}`,
  site_name: 'JR Bordados',
  title: 'JR Bordados',
  description: `O melhor bordado de Fortaleza`,
  images: [
    {
      url: `${imageBase}${logoFace}`,
      width: 512,
      height: 512,
      alt: 'JR Bordados',
      type: 'image/png'
    }
  ]
}

export function getOpenGraph(data: Partial<OpenGraphParams>): OpenGraph {
  const { asPath } = data
  const url = `${imageBase}${asPath}`

  const result = Object.keys(data).reduce((acc, key) => {
    if (data[key]) acc[key] = data[key]
    return acc
  }, {})
  return { ...openGraph, ...result, url }
}
