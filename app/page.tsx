"use client"

import { useSession } from 'next-auth/react'
import { IoArrowForwardOutline, IoPlayCircleSharp, IoBookOutline } from 'react-icons/io5'
import Link from 'next/link'
import Button from '@/components/Button'

export default function Home() {
  return (
    <div className='w-full flex flex-col items-center'>
      <section className='w-full max-w-[1200px] flex flex-col items-center p-[5%]'>

        <h1 className='text-5xl font-bold max-w-[750px] text-center'>Mais que Armazenamento</h1>
        <h5 className='text-5xl font-bold text-[#6C47FF] max-w-[750px] text-center'>Plataforma Completa de Controle</h5>

        <p className='mt-14 text-xl text-center max-w-[750px]'>Nossa Cloud não se trata somente de um sistema de nuvem comum. Use uma plataforma completa de armazenamento e gerenciamento de informações.</p>

        <div className='w-full flex justify-center items-center gap-20 mt-10'>
          <Link href={"/dashboard"}>
            <div className='flex gap-3 items-center justify-center bg-[#6C47FF] pb-3 pt-3 pl-6 pr-6 rounded-xl text-white text-xl text-center cursor-pointer transition-all duration-300 hover:bg-[#563cbd]'>
              Comece Aqui
              <IoArrowForwardOutline size={20} className="icon-white" />
            </div>
          </Link >
          <div className='flex gap-3 items-center justify-center'>
            <IoPlayCircleSharp size={50} className="icon-purple cursor-pointer" />
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

      </section>

      <div className="custom-shape-divider-top-1696300465 mt-48">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>
      <section className='w-full min-h-[72vh] bg-[#0C0129] flex flex-col items-center p-[10%]'>

        <div className='w-full flex flex-wrap justify-center gap-8'>
          <div className='max-w-[400px]'>
            <h1 className='text-5xl font-bold text-white'>Compartilhamento<br /> de Informações</h1>
            <h4 className='text-white text-lg mt-4 italic'>Tudo que você precisa para armazenar arquivos e compartilhar entre as pessoas</h4>
            <p className='text-[#B3B3D0] mt-20'>Uma forma moderna e agradável para guardar suas informações de uma forma segura, nem preocupações relacionadas com a perca de arquivos.</p>
            <div className='mt-20 flex justify-center gap-4'>
              <Button text="Experimentar" btnClass='bg-[#6C47FF] p-3 rounded-xl text-white text-base text-center cursor-pointer transition-all duration-300 hover:bg-[#563cbd] w-full' />
              <Button text="Ver documentação" btnClass='bg-white text-[#6C47FF] text-base p-3 rounded-xl text-center cursor-pointer w-full' />
            </div>
          </div>
          <div>
            <img src="https://clerk.com/_next/image?url=%2Fimages%2Fcomponents%2Fcomponent-sign_in.svg&w=3840&q=75" alt="Sign Form" />
          </div>
        </div>

        <div className='w-full max-w-[825px] flex flex-col items-center mt-32'>
          <h1 className='uppercase text-[#D2FB9C] text-center text-sm tracking-widest leading-5 font-bold'>Uma plataforma moderna</h1>
          <h2 className='text-white font-bold mt-10 text-5xl text-center'>As plataformas mais poderosas são construídas especialmente para a Web</h2>
          <h5 className='text-center mt-6 text-[#B3B3D0] max-w-[650px]'>New technologies have made building on the web much easier; however, many dev tools haven’t kept up. At Clerk, we believe a component is worth 1,000 APIs and that they should work seamlessly in any stack so that you can build faster.</h5>
        </div>

        <img src="https://clerk.com/_next/image?url=%2Fimages%2Fhome%2Fframeworks.png&w=3840&q=75" alt="Main Image" className='w-full cursor-pointer max-w-[1200px] xl:mt-[-75px] mt-[10px]' />

      </section>
      <div className="custom-shape-divider-top-1696300465 rotate mb-48">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="shape-fill"></path>
        </svg>
      </div>

      <section className='p-[5%]'>
        <div className='max-w-[750px]'>
          <h3 className='uppercase text-[#6C47FF] text-xs font-bold tracking-widest leading-5'>Depoimentos</h3>
          <h1 className='mt-4 text-5xl font-bold'>Cloudify é utilizado em  <br /> todos os locais do mundo</h1>
          <div className='mt-16 w-full h-[350px] gradient-main rounded-xl flex gap-4 justify-between'>
            <div className='p-8 w-full'>
              <h4 className='font-bold text-xl'>"Fácil de usar"</h4>
              <p className='mt-4 leading-7'>Senti uma extrema facilidade em utilizar o cloudify, se trata de uma plataforma extremamente completa para o uso de pessoal e armazenar arquivos</p>
            </div>
            <img src="https://clerk.com/_next/image?url=%2Fimages%2Fcomponents%2Fcomponent-sign_in.svg&w=3840&q=75" alt="Cellphone photo" className='h-[500px] mt-[-50px] hidden sm:block'/>
          </div>
        </div>
      </section>

      <section className='p-[5%]'>
        <h1 className='text-3xl font-bold text-center'>Novidades</h1>
        <p className='mt-1 text-center'>Receba todas as novidades do Cloudify</p>
        <div className='flex justify-between gap-4 w-full max-w-[450px] mt-4 rounded-xl bg-white border border-[#D8DDE8] p-2'>
          <input type="email" name='email' id='email' placeholder='Digite o seu email' className='outline-none w-full bg-transparent text-sm text-[#626B7F] pl-2' />
          <Button text="Inscrever" btnClass='bg-[#6C47FF] p-3 rounded-xl text-white text-sm text-center cursor-pointer transition-all duration-300 hover:bg-[#563cbd] w-[150px]' />
        </div>
      </section>

    </div>
  )
}
