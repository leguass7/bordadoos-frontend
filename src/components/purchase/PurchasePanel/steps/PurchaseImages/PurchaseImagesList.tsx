/* eslint-disable @next/next/no-img-element */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { Delete, Download } from '@mui/icons-material'
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { EmbroideryImage } from '@prisma/client'

import { CircleLoading } from '~/components/CircleLoading'
import { useIsMounted } from '~/hooks/useIsMounted'
import { deleteEmbroideryImage, listEmbroideryImages } from '~/services/api/images'

interface Props {
  purchaseId: number
  uploaded?: boolean
  toggleUploaded?: () => void
}

export const PurchaseImageList: React.FC<Props> = ({ purchaseId, uploaded, toggleUploaded }) => {
  const [data, setData] = useState<EmbroideryImage[]>([])
  const { breakpoints } = useTheme()

  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const isMobile = useMediaQuery(breakpoints.down('sm'))
  const isTablet = useMediaQuery(breakpoints.only('sm'))

  const cols = useMemo(() => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }, [isMobile, isTablet])

  const fetchData = useCallback(async () => {
    if (!purchaseId) return null
    setLoading(true)

    const response = await listEmbroideryImages({ purchaseId })
    if (isMounted()) {
      setLoading(false)
      if (response?.data) setData(response.data)
    }
  }, [isMounted, purchaseId])

  useEffect(() => {
    if (uploaded) {
      toggleUploaded()
      fetchData()
    }
  }, [fetchData, toggleUploaded, uploaded])

  const downloadImage = useCallback(
    (uri: string, filename: string) => () => {
      const downloadLink = document.createElement('a')

      downloadLink.href = uri
      downloadLink.download = filename
      downloadLink.click()
    },
    []
  )

  const deleteImage = useCallback(
    async (imageId: number) => {
      if (!imageId) return

      deleteEmbroideryImage(imageId).then(fetchData)
    },
    [fetchData]
  )

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      {data.length ? (
        <ImageList gap={12} cols={cols}>
          {data.map(image => {
            return (
              <ImageListItem key={image.id}>
                <img
                  style={{ borderRadius: '12px' }}
                  src={image.uri}
                  // srcSet={`${image.uri}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={image.name}
                  loading="lazy"
                />
                <ImageListItemBar
                  title={image.name}
                  actionIcon={
                    <>
                      <IconButton onClick={downloadImage(image.uri, image.name)} color="default">
                        <Download />
                      </IconButton>
                      <IconButton onClick={() => deleteImage(image.id)} color="default">
                        <Delete />
                      </IconButton>
                    </>
                  }
                  position="below"
                />
              </ImageListItem>
            )
          })}
          {loading ? <CircleLoading /> : null}
        </ImageList>
      ) : (
        <Grid container justifyContent="center" alignItems="center">
          <Typography align="center">Nenhuma imagem do bordado encontrada</Typography>
        </Grid>
      )}
    </>
  )
}
