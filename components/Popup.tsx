import { Popup } from '@/types'
import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'

const Popup = ({ children, show, title }: Popup) => {

  return (
    <div className='fixed w-full h-full left-0 top-0'>
      <div className='glassmorphism'>
        <div className='bg-white w-[450px] h-[400px] rounded-3xl p-10'>
          <div className='flex justify-between'>
            <h1 className='w-full text-center text-[#6C47FF] font-bold text-3xl mb-16'>{title || ""}</h1>
            <IoCloseSharp size={25} className="cursor-pointer" />
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