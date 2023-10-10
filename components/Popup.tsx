import { Popup } from '@/types'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const Popup = ({ children, show, title, width, height }: Popup) => {

  return (
    <div className='fixed w-full h-full left-0 top-0 z-50 bg-white'>
      <div className='glassmorphism'>
        <div className={`bg-white ${height} ${width} rounded-3xl p-10`}>
          <div className='flex justify-between'>
            <h1 className='w-full text-center font-bold text-3xl mb-16'>{title || ""}</h1>
            <IoCloseSharp size={25} className="cursor-pointer" onClick={() => show(false)} />
          </div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Popup