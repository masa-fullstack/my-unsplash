import { Header } from './Header'
import { Dispatch, SetStateAction, useState } from 'react'
import { Loading } from './Loading'
import { ImageCard } from './ImageCard'
import { useImage } from './hooks/useImage'

export type SetSearchLabelText = Dispatch<SetStateAction<string>>

export const MyUnsplash: React.FC = () => {
  const [searchLabelText, setSearchLabelText] = useState('')
  const { images, error, afterAdd, afterDelete } = useImage()

  // error
  if (error)
    return (
      <div className="flex justify-center items-center mb-20">
        <span className="text-red-500 text-3xl font-light text-center">
          failed to load
        </span>
      </div>
    )

  // loading
  if (!images)
    return (
      <div className="flex justify-center items-center mb-20">
        <Loading type="spin" color="black" />
      </div>
    )

  const filterdImages = images.filter(
    (image) => image.label.indexOf(searchLabelText) > -1
  )

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-32 z-10 bg-gray-100 bg-opacity-90">
        <Header
          searchLabelText={searchLabelText}
          setSearchLabelText={setSearchLabelText}
          afterAdd={afterAdd}
        />
      </div>
      <div className="pt-32">
        {filterdImages.length === 0 ? (
          <div className="flex justify-center items-center">
            <div className="h-48 w-96 text-center">
              <span className="text-3xl">NO DATA FOUND</span>
            </div>
          </div>
        ) : (
          <div className="md:masonry-3 xs:masonry-2 before:box-inherit after:box-inherit">
            {filterdImages.map((image) => {
              return (
                <div key={image.id} className="break-inside p-6 my-6">
                  <ImageCard image={image} afterDelete={afterDelete} />
                </div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}
