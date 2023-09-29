import React from 'react'
import { Button } from '@/types'

const Button = ({ btnClass, text, onClick }: Button) => {
  return (
    <div className={`${btnClass}`} onClick={onClick}>{text}</div>
  )
}

export default Button