import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'

type Props = {
  label?: string
  type: string
  placeholder: string
  error?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  register?: UseFormRegisterReturn
  value?: string
  icon?: string
}

const Input: React.FC<Props> = (props) => {
  const className = props.error
    ? 'rounded-lg border-transparent flex-1 appearance-none w-full py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none ring-2 ring-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent'
    : 'rounded-lg border-transparent flex-1 appearance-none border border-gray-500 w-full py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'

  const iconPaddingClassName = props.icon ? 'pl-8 pr-4 ' : 'px-4'
  return (
    <div className="relative">
      {props.label && (
        <label htmlFor="password" className="text-gray-700 text-sm mb-3">
          {props.label}
          <span className="text-red-500 required-dot">*</span>
        </label>
      )}
      <input
        type={props.type}
        name={props.label}
        className={className + ' ' + iconPaddingClassName}
        placeholder={props.placeholder}
        {...props.register}
        value={props.value}
        onChange={(e) => {
          if (props.onChange) {
            props.onChange(e)
          }
        }}
      />
      {props.icon && (
        <span className="material-icons absolute text-gray-500 left-2 bottom-2">
          {props.icon}
        </span>
      )}

      {props.error && (
        <>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="currentColor"
            className="absolute text-red-500 right-2 bottom-3"
            viewBox="0 0 1792 1792"
          >
            <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z"></path>
          </svg>
          <p className="absolute text-sm text-red-500 -bottom-6">
            {props.error}
          </p>
        </>
      )}
    </div>
  )
}

export default Input
