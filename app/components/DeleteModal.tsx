import React, { useState } from 'react'
import Modal from 'react-modal'
import { useForm, SubmitHandler } from 'react-hook-form'
import Input from './Input'
import Button from './Button'
import axios from 'axios'
import { Loading } from './Loading'
import { AfterDelete } from './hooks/useImage'
import useModalStyle from './hooks/useModalStyle'

type Props = {
  hideModal: () => void
  deleteId: string
  afterDelete: AfterDelete
}

type Inputs = {
  password: string
}

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#__next')
const { customStyles } = useModalStyle({ height: '300px' })

const DeleteModal: React.FC<Props> = (props) => {
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
      .patch(`/api/image/${props.deleteId}`, {
        password: data.password,
      })
      .then(() => {
        props.hideModal()
        props.afterDelete(props.deleteId)
      })
      .catch((error) => {
        if (error.request.status === 401) {
          setError('password', {
            type: 'incorrect',
            message: 'Incorrect password',
          })
        } else {
          setError('password', {
            type: 'incorrect',
            message: error.message,
          })
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <>
      <Modal
        isOpen
        style={customStyles}
        onRequestClose={props.hideModal}
        shouldCloseOnOverlayClick={true}
      >
        {isLoading && (
          <div className="flex justify-center items-center h-full">
            <Loading type="balls" color="black" />
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="p-5">
            <div className="text-2xl mb-5">Are you sure?</div>
            <div className="mb-8">
              <Input
                type="password"
                placeholder="Enter admin password"
                label="Password"
                error={errors.password && errors.password.message}
                register={register('password', {
                  required: 'This field is required',
                  maxLength: {
                    value: 100,
                    message: 'This field is max 100 characters',
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
                <Button type="submit" color="warning" value="Delete" />
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  )
}

export default DeleteModal
