import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import axios from 'axios'
import { Loading } from './Loading'
import { AfterAdd } from './hooks/useImage'

type Props = {
  hideModal: () => void
  afterAdd: AfterAdd
}

type Inputs = {
  label: string
  photoURL: string
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')

const AddModal: React.FC<Props> = (props) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>()

  const [isLoading, setIsLoading] = useState(false)
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setIsLoading(true)
    axios
      .post(`/api/image`, {
        label: data.label,
        imageURL: data.photoURL,
      })
      .then((response) => {
        props.hideModal()
        props.afterAdd({
          id: response.data.identifiers[0].id,
          fileName: data.label,
          file: data.photoURL,
          label: data.label,
        })
      })
      .catch((error) => {
        setError('photoURL', {
          type: 'validate',
          message: error,
        })
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal
        isOpen
        onRequestClose={props.hideModal}
        shouldCloseOnOverlayClick={true}
        className="Modal"
        overlayClassName="Overlay"
      >
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Loading type="balls" color="black" />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-10">
            <div className="text-2xl mb-5">Add a new photo</div>
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Enter the label you like"
                label="label"
                error={errors.label && errors.label.message}
                register={register('label', {
                  required: 'This field is required',
                  maxLength: {
                    value: 100,
                    message: 'This field is max 100 characters',
                  },
                })}
              />
            </div>
            <div className="mb-8">
              <Input
                type="text"
                placeholder="Enter photo URL"
                label="photoURL"
                error={errors.photoURL && errors.photoURL.message}
                register={register('photoURL', {
                  required: 'This field is required',
                  maxLength: {
                    value: 200,
                    message: 'This field is max 200 characters',
                  },
                  pattern: {
                    value:
                      /https?:\/\/[\w!?/+\-_~=;.,*&@#$%()'[\]]+(\.png|\.jpg|\.jpeg|\.gif)/,
                    message: 'Incorrect image URL',
                  },
                })}
              />
            </div>
            <div className="flex justify-end">
              <div className="">
                <Button
                  type="submit"
                  color="secondary"
                  value="Cancel"
                  onClick={props.hideModal}
                />
              </div>
              <div className="ml-3">
                <Button type="submit" color="primary" value="Submit" />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default AddModal
