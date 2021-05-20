import Image from 'next/image'
import { useModal } from 'react-modal-hook'
import Button from './Button'
import AddModal from './AddModal'
import Input from './Input'
import { SetSearchLabelText } from './MyUnsplash'
import { AfterAdd } from './hooks/useImage'

type Props = {
  searchLabelText: string
  setSearchLabelText: SetSearchLabelText
  afterAdd: AfterAdd
}

export const Header: React.FC<Props> = (props) => {
  const [showModal, hideModal] = useModal(() => (
    <AddModal hideModal={hideModal} afterAdd={props.afterAdd} />
  ))

  return (
    <div className="container mx-auto flex justify-between items-center p-10">
      <div className="sm:flex sm:items-center">
        <div>
          <Image src="/my_unsplash_logo.svg" height={26} width={138} />
        </div>

        <div className="ml-5 max-w-full">
          <Input
            type="text"
            placeholder="Search by label"
            value={props.searchLabelText}
            icon="search"
            onChange={(e) => {
              props.setSearchLabelText(e.target.value)
            }}
          />
        </div>
      </div>
      <div className="ml-2">
        <Button
          type="button"
          color="primary"
          onClick={showModal}
          value="Add a photo"
        />
      </div>
    </div>
  )
}
