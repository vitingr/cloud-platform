"use client"

import React, { useEffect, useState } from 'react'
import { onSnapshot } from 'firebase/firestore'
import { database } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ArrayType } from '@/types'
import {IoDocumentText, IoEllipsisVerticalSharp} from 'react-icons/io5'

let files = collection(database, "files")

const Files = () => {

  const [fileList, setFileList] = useState<ArrayType | any>([])

  const getFiles = async () => {
    const newFileList: any = [];

    onSnapshot(files, (response) => {
      response.docs.forEach((item) => {
        newFileList.push({ ...item.data(), id: item.id });
      });
      setFileList(newFileList)
      // setFileList(JSON.stringify(newFileList));
    });
  }

  useEffect(() => {
    getFiles()
  }, [])

  return (
    <div className='flex gap-8 mt-24'>
      {fileList.map((item: any) => (
        <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px]' key={item.id}>
          <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
            <IoDocumentText size={20}/>
            <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name}</h1>
            <IoEllipsisVerticalSharp size={20} className="cursor-pointer" />
          </div>
          <div className='h-[200px]'>
            <img src={item.imageLink} alt="File Photo" className='w-full h-[200px] rounded-xl' />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Files