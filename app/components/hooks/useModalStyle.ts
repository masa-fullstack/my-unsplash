import { CSSProperties } from 'react'
import Modal from 'react-modal'

type UseModalStyles = (inputStyles?: CSSProperties) => {
  customStyles: Modal.Styles
}
const useModalStyle: UseModalStyles = (inputStyles) => {
  const customStyles = {
    overlay: {
      zIndex: 100,
      backgroundColor: 'rgba(0,0,0,0.50)',
    },
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      width: '500px',
      height: '420px',
      transform: 'translate(-50%, -50%)',
      borderRadius: '30px',
      borderColor: 'white',
      overflow: 'hidden',
      ...inputStyles,
    },
  }

  return { customStyles }
}

export default useModalStyle
