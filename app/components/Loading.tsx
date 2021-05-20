import React from 'react'
import ReactLoading, { LoadingType } from 'react-loading'

type Props = {
  type?: LoadingType
  color?: string
}

export const Loading: React.FC<Props> = ({ type, color }) => (
  <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
)
