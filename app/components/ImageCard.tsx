import { useModal } from 'react-modal-hook'
import DeleteModal from './DeleteModal'
import { ImageData } from './hooks/useImage'

type Props = {
  image: ImageData
  afterDelete: (id: string) => void
}

export const ImageCard: React.FC<Props> = (props) => {
  const [showModal, hideModal] = useModal(() => (
    <DeleteModal
      hideModal={hideModal}
      deleteId={props.image.id}
      afterDelete={props.afterDelete}
    />
  ))

  return (
    <div className="bg-black rounded-3xl relative wrapper">
      <img
        src={props.image.file}
        className="max-w-full h-auto rounded-3xl wrapper__img"
      />
      <div
        className="absolute top-4 right-4 text-red-600 text-xs border border-red-600 rounded-3xl py-1 px-2 wrapper__delete"
        onClick={showModal}
      >
        delete
      </div>
      <div
        className="absolute bottom-4 left-4 pr-10 text-white text-sm  wrapper__label w-3/4 overflow-hidden"
        title={props.image.label}
      >
        {props.image.label}
      </div>
    </div>
  )
}
