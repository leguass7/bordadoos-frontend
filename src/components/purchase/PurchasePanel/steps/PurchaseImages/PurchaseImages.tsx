import { useCallback, useState } from 'react'
import { FileUploader } from 'react-drag-drop-files'

import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Card, Grid, Typography } from '@mui/material'
import styled from 'styled-components'

import { CardTitle } from '~/components/CardTitle'
import { CircleLoading } from '~/components/CircleLoading'
import { removeFileExtension } from '~/helpers/string'
import { useIsMounted } from '~/hooks/useIsMounted'
import { CustomFile, uploadEmbroideryImages } from '~/services/api/images'

import { PurchaseImageList } from './PurchaseImagesList'

const acceptedFiles = ['jpeg', 'jpg', 'png', 'webp']

async function compressImage(file: File, maxWidth: number, maxHeight: number, quality: number): Promise<CustomFile> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = event => {
      const img = new Image()
      img.src = event.target.result as any
      img.onload = async () => {
        let width = img.width
        let height = img.height

        if (width > height) {
          if (width > maxWidth) {
            height *= maxWidth / width
            width = maxWidth
          }
        } else {
          if (height > maxHeight) {
            width *= maxHeight / height
            height = maxHeight
          }
        }

        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, width, height)

        const base64String = canvas.toDataURL('image/webp', quality)
        const blob = await new Promise<Blob | null>(resolve =>
          canvas.toBlob(blob => resolve(blob), 'image/webp', quality)
        )

        const file = {
          type: blob?.type || null,
          size: blob?.size ?? 0,
          uri: base64String
        }

        resolve(file)
      }
    }
    reader.onerror = error => reject(error)
  })
}

interface Props {
  purchaseId?: number
}

export const PurchaseImages: React.FC<Props> = ({ purchaseId }) => {
  const [loading, setLoading] = useState(false)
  const isMounted = useIsMounted()

  const [uploaded, setUploaded] = useState(false)

  const toggleUploaded = useCallback(() => {
    setUploaded(old => !old)
  }, [])

  const uploadFiles = useCallback(
    async (files: CustomFile[]) => {
      if (!purchaseId) return null
      setLoading(true)
      await uploadEmbroideryImages(purchaseId, files)
      if (isMounted()) {
        setLoading(false)
        toggleUploaded()
      }
    },
    [isMounted, purchaseId, toggleUploaded]
  )

  const handleChange = useCallback(
    async (fileList: FileList) => {
      const arrayFiles = Array.from(fileList)
      const promises = arrayFiles.map(async file => {
        const compressed = await compressImage(file, 1280, 720, 0.8)
        return { ...compressed, name: removeFileExtension(`${file.name || ''}`) }
      })

      const files = await Promise.all(promises)
      uploadFiles(files)
    },
    [uploadFiles]
  )

  return (
    <>
      <Grid item p={2} xs={12}>
        <FileUploader multiple types={acceptedFiles} handleChange={handleChange}>
          <UploadContainer>
            <div style={{ alignItems: 'center', display: 'flex', paddingRight: '12px' }}>
              <AddPhotoAlternateIcon />
              <Typography pl={1} variant="body1">
                Puxe seus arquivos aqui
              </Typography>
            </div>
            <Typography variant="caption">{acceptedFiles.join(',')}</Typography>
          </UploadContainer>
        </FileUploader>
      </Grid>
      <Grid item p={2} xs={12}>
        <PurchaseImageList uploaded={uploaded} toggleUploaded={toggleUploaded} purchaseId={purchaseId} />
      </Grid>
      {loading ? <CircleLoading /> : null}
    </>
  )
}

const UploadContainer = styled.div`
  padding: 12px;
  border: dashed 2px;
  cursor: pointer;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`
