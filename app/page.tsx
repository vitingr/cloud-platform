"use client"

import Image from 'next/image'
import Button from '@/components/Button'
import { useSession } from 'next-auth/react'
import { IoArrowForwardOutline, IoPlayCircleSharp } from 'react-icons/io5'
import UploadFile from '@/components/common/UploadFile'
import Link from 'next/link'

export default function Home() {

  const { data: session } = useSession()

  return (
    <div className='w-full p-[5%] flex flex-col items-center'>
      <div className='w-full max-w-[1200px] flex flex-col items-center'>

        <h1 className='text-5xl font-bold max-w-[750px] text-center'>Mais que Armazenamento</h1>
        <h5 className='text-5xl font-bold text-[#6C47FF] max-w-[750px] text-center'>Plataforma Completa de Controle</h5>

        <p className='mt-14 text-xl text-center max-w-[750px]'>Nossa Cloud não se trata somente de um sistema de nuvem comum. Use uma plataforma completa de armazenamento e gerenciamento de informações.</p>

        <div className='w-full flex justify-center items-center gap-20 mt-10'>
          <div className='flex gap-3 items-center justify-center bg-[#6C47FF] pb-3 pt-3 pl-6 pr-6 rounded-xl text-white text-xl text-center cursor-pointer transition-all duration-300 hover:bg-[#563cbd]'>
            Comece Aqui
            <IoArrowForwardOutline size={20} className="icon-white" />
          </div>
          <div className='flex gap-3 items-center justify-center'>
            <IoPlayCircleSharp size={50} className="icon-purple" />
            <div>
              <p className='text-base text-[#6C47FF]'>Ver demonstração</p>
              <p className='text-sm'>2 min</p>
            </div>
          </div>
        </div>

        <img src="https://clerk.com/_next/image?url=%2Fimages%2Fhome%2Fnew-hero.png&w=3840&q=75" alt="Main Image" className='w-full mt-24 cursor-pointer' />

        <h1 className='max-w-[750px] w-full text-center font-bold text-5xl flex flex-wrap gap-3 justify-center'>
          Armazenando
          <span className="font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#17CCFC]">
          10.000 + 
        </span>
          de arquivos e
          <span className="font-bold text-transparent text-5xl bg-clip-text bg-gradient-to-r from-[#6C47FF] to-[#17CCFC]">
          milhões
        </span>
        de dados
        </h1>

        <Link href={"/dashboard"}>
          Ir para o Dashboard
        </Link>

      </div>
    </div>
  )
}
