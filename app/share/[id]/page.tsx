"use client"

import Files from '@/components/common/Files'
import { database } from '@/database/firebase'
import { ArrayType } from '@/types'
import { collection, onSnapshot } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoCloudDownloadSharp, IoInformationCircleOutline, IoPrintSharp } from 'react-icons/io5'

let files = collection(database, "files")

const page = () => {

  const [file, setFile] = useState<ArrayType | any>([])
  const { data: session, status } = useSession()

  const pathname = usePathname().split("/")
  const idItem = pathname[2]

  const getFile = async () => {

    if (session != undefined && status === "authenticated") {
      onSnapshot(files, (response) => {
        response.docs.forEach((item) => {
          console.log(`value: ${item.id} || id = ${idItem}`)
          if (item.id === idItem) {
            setFile({ ...item.data(), id: item.id });
          } else {
            return
          }
        });
      });
    }
  }

  useEffect(() => {
    getFile()
  })

  return file.imageLink !== undefined ? (
    <div className='flex flex-col items-center p-[1%] max-w-[900px] w-full'>
      <div className='flex justify-between w-full'>
        <div className='w-full text-sm'>{file.id}</div>
        <div className='w-full flex justify-end gap-6'>
          <IoCloudDownloadSharp size={25} className="cursor-pointer" />
          <IoInformationCircleOutline size={25} className="cursor-pointer" />
          <IoPrintSharp size={25} className="cursor-pointer" />
        </div>
      </div>
      <div className='flex flex-col items-center w-full mt-16'>
        <img src={file.imageLink} alt="Item Photo" className='max-w-[650px] max-h-[650px] transition-all duration-300 hover:scale-105' />
      </div>
      <div className='w-full mt-16'>
        <h1 className='font-bold text-lg'>{file.name}</h1>
        <h3 className='text-neutral-500 text-sm'>Criador: {file.creator}</h3>
      </div>
    </div>
  ) : (
    <></>
  )
}

export default page