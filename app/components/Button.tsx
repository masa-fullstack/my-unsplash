import React, { InputHTMLAttributes } from 'react'

type Color = 'primary' | 'secondary' | 'warning'
type Type = 'button' | 'submit'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  type: Type
  color: Color
}

const Button: React.FC<Props> = (props) => {
  const { type, color, ...inputProps } = props

  let className = 'xs:py-4 xs:px-6 py-2 px-4 rounded-xl shadow-lg text-sm'
  switch (color) {
    case 'primary':
      className += ' bg-green-500 text-white'
      break
    case 'secondary':
      className += ' bg-gray-100 text-gray-400'
      break
    case 'warning':
      className += ' bg-red-400 text-white'
      break
    default:
      break
  }

  return <input type={type} className={className} {...inputProps} />
}

export default Button
