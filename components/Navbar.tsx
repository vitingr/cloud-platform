"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Button from './Button'
import { addUser } from '@/utils/functions/firestore'
import { collection, onSnapshot } from 'firebase/firestore'
import { database } from '@/database/firebase'

let users = collection(database, "users")

interface userInfo {
  name: string;
  email: string;
  image: string;
}

const Navbar = () => {

  const [user, setUser] = useState<any>([])
  const [validation, setValidation] = useState<boolean>(false)
  const { data: session, status } = useSession()

  const getUser = async () => {
    const userData: any = [];
    try {
      onSnapshot(users, (response) => {
        response.docs.forEach((item) => {
          let value = { ...item.data() }
          if (value.email === session?.user?.email) {
            userData.push({ ...item.data(), id: item.id });
          }
        });
        setUser(userData)
        setValidation(true)
      });
    } catch (error) {
      console.log(error)
    }
  }

  const checkUser = async () => {
    try {
      if (user.length === 0) {
        let userInfo: userInfo | any = {
          name: session?.user?.name,
          email: session?.user?.email,
          image: session?.user?.image
        }
        addUser(userInfo)
      }
    } catch (error) {
      throw new Error("Erro ao verificar o usuário")
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (session != undefined && status === "authenticated") {
        try {
          await getUser()
          if (validation === true) {
            await checkUser()
          }
        } catch (error) {
          throw new Error("Erro! não foi possível autenticar o usuário")
        }
      }
    }
    fetchData()
  }, [session])

  return (
    <nav className='w-full min-h-[75px] flex items-center justify-around p-10 gap-20'>
      <Link href="/" className='w-full flex justify-end'>
        <h1 className="font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-[#17CCFC] to-[#6C47FF]">
          Cloudify
        </h1>
      </Link>

      <div className='list-none gap-12 w-full justify-center hidden sm:flex sm:block'>
        <Link href={"/"}><li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Início</li></Link>
        <Link href={"/dashboard"}><li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Dashboard</li></Link>
        <Link href={"/resources"}><li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Recursos</li></Link>
        <Link href={"/help"}><li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Como funciona</li></Link>
        <Link href={"/about"}><li className='text-[#5d636d] cursor-pointer transition-all duration-300 hover:text-[#262f40]'>Sobre</li></Link>
      </div>

      <div className='w-full flex justify-start'>
        {session?.user ? (
          <>
            <Link href="/dashboard">
              <img src={session?.user?.image || ""} alt="Profile Image" className='h-[35px] rounded-full mr-6 cursor-pointer transition-all duration-300 hover:scale-110' />
            </Link>
            <Button btnClass='w-[75px] h-[35px] cursor-pointer bg-white text-[#6C47FF] border border-[#6C47FF] rounded-xl transition-all duration-500 hover:bg-[#563cbd] hover:text-white flex items-center justify-center' text='Logout' onClick={() => signOut()} />
          </>
        ) : (
          <><Button btnClass='w-[100px] h-[35px] cursor-pointer p-2 bg-[#6C47FF] text-white font-bold rounded-xl transition-all duration-300 hover:bg-[#563cbd] flex items-center justify-center' text='Login' onClick={() => signIn()} /></>
        )}
      </div>

    </nav>
  )
}

export default Navbar