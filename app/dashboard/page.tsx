import Files from '@/components/common/Files'
import UploadFile from '@/components/common/UploadFile'
import React from 'react'
import { IoAddOutline, IoSearch } from 'react-icons/io5'

const page = () => {
  return (
    <div className='w-full flex flex-col p-[5%] max-w-[1600px]'>
      <div className='w-full flex justify-around'>
        <h1 className='w-full font-bold text-4xl'>Seus arquivos</h1>
        <div className='w-full flex justify-end '>
          <div className='bg-[#6C47FF] text-white flex items-center pb-2 pt-2 pl-4 pr-4 rounded-xl cursor-pointer gap-2 transition-all duration-300 hover:bg-[#563cbd]'>
            Adicionar Pasta <IoAddOutline size={20} className="icon-white" />
          </div>
        </div>
      </div>

      <div className='w-full mt-8 bg-[#edf2fc] flex items-center gap-6 pt-4 pb-3 pl-6 pr-6 rounded-full'>
        <IoSearch size={20} />
        <input type="text" name="search" id="search" placeholder='Buscar um arquivo específico' className='w-full flex items-center outline-none bg-transparent text-neutral-500' />
      </div>

      <Files/>

      <div className='mt-32'>
        <UploadFile />
      </div>

    </div>
  )
}

export default page