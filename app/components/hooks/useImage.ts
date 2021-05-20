import useSWR from 'swr'
import imageData from '../../data/images.json'

export type ImageData = typeof imageData
export type AfterAdd = (image: ImageData) => void
export type AfterDelete = (id: string) => void

type UseImage = () => {
  images: ImageData[]
  error: any
  afterAdd: AfterAdd
  afterDelete: AfterDelete
}

export const useImage: UseImage = () => {
  const {
    data: images,
    error,
    mutate,
  } = useSWR<ImageData[]>('/api/image', {
    // windowのフォーカス時にRevalidateしないように設定
    revalidateOnFocus: false,
  })

  const afterAdd: AfterAdd = (image: ImageData) => {
    mutate([...images, image])
  }

  const afterDelete: AfterDelete = (deleteId) => {
    mutate(images.filter((image) => image.id !== deleteId))
  }

  return {
    images,
    error,
    afterAdd,
    afterDelete,
  }
}
