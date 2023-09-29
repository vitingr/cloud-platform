"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import { text } from 'stream/consumers'
import Button from './Button'

const Navbar = () => {

  const { data: session } = useSession()

  return (
    <nav className='w-full min-h-[75px] flex items-center justify-around p-10 gap-20'>
      <Link href="/" className='w-full flex justify-end'>
        <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-[#17CCFC] to-[#6C47FF]">
          Projetinho
        </h1>
      </Link>

      <div className='flex list-none gap-12 w-full justify-center'>
        <li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Início</li>
        <li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Recursos</li>
        <li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Documentação</li>
        <li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Preço</li>
        <li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Desenvolvedor</li>
      </div>

      <div className='w-full flex justify-start'>
        {session?.user ? (
          <>
          <img src={session?.user.image || ""} alt="Profile Image" className='h-[40px] rounded-full mr-6 cursor-pointer transition-all duration-300 hover:scale-110' />
          <Button btnClass='w-[100px] cursor-pointer p-2 bg-[#6C47FF] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#563cbd] flex items-center justify-center' text='Logout' onClick={() => signOut()} />
          </>
        ) : (
          <><Button btnClass='w-[100px] cursor-pointer p-2 bg-[#6C47FF] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#563cbd] flex items-center justify-center' text='Login' onClick={() => signIn()} /></>
        )}
      </div>

    </nav>
  )
}

export default Navbar