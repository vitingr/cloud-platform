"use client"

import Files from '@/components/common/Files'
import UploadFile from '@/components/common/UploadFile'
import React, { useEffect, useState } from 'react'
import { IoAddOutline, IoSearch } from 'react-icons/io5'
import Popup from '@/components/Popup'
import { addFolder } from '@/utils/functions/firestore'
import { onSnapshot } from 'firebase/firestore'
import { database } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { ArrayType } from '@/types'

let files = collection(database, "files")

const page = () => {

  const [isCreateFolderVisible, setCreateFolderVisible] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const createFolder = async () => {
    if (folderName !== "" && description !== "") {
      let payload = {
        folderName: folderName,
        isFolder: true,
        fileList: []
      }

      addFolder(payload)
      setCreateFolderVisible(false)
      getFiles()
    }
  }

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

    <div className='w-full flex flex-col p-[5%] max-w-[1600px]'>
      <div className='w-full flex justify-around'>
        <h1 className='w-full font-bold text-4xl'>Seus arquivos</h1>
        <div className='w-full flex justify-end '>
          <div className='bg-[#6C47FF] text-white flex items-center pb-2 pt-2 pl-4 pr-4 rounded-xl cursor-pointer gap-2 transition-all duration-300 hover:bg-[#563cbd]' onClick={() => setCreateFolderVisible(true)}>
            Adicionar Pasta <IoAddOutline size={20} className="icon-white" />
          </div>
        </div>
      </div>

      <div className='w-full mt-8 bg-[#edf2fc] flex items-center gap-6 pt-4 pb-3 pl-6 pr-6 rounded-full'>
        <IoSearch size={20} />
        <input type="text" name="search" id="search" placeholder='Buscar um arquivo específico' className='w-full flex items-center outline-none bg-transparent text-neutral-500' />
      </div>

      <Files fileList={fileList} />

      <div className='mt-32'>
        <UploadFile />
      </div>

      {isCreateFolderVisible ? (
        <Popup title='Adicionar Pasta' show={setCreateFolderVisible}>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createFolder()
          }} className='flex flex-col'>
            <label htmlFor="nome">Nome da Pasta <span className='text-[#6C47FF]'>*</span></label>
            <input type="text" name='nome' id="nome" className='bg-[#edf2fc] outline-none rounded-lg p-2 text-sm text-[#393c3dbd] mb-8' autoComplete='off' spellCheck="false" maxLength={60} minLength={1} onChange={(e) => setFolderName(e.target.value)} required />

            <label htmlFor="descricao">Descrição <span className='text-[#6C47FF]'>*</span></label>
            <input type="text" name='descricao' id="descricao" className='bg-[#edf2fc] outline-none rounded-lg p-2 text-sm text-[#393c3dbd]' autoComplete='off' spellCheck="false" maxLength={60} minLength={1} onChange={(e) => setDescription(e.target.value)} required />

            <button className='mt-12 bg-[#6C47FF] text-white flex items-center justify-center pb-2 pt-2 pl-4 pr-4 rounded-xl cursor-pointer gap-2 transition-all duration-300 hover:bg-[#563cbd] font-bold' type='submit'>
              Criar Pasta
            </button>
          </form>
        </Popup>
      ) : (
        <></>
      )}

    </div>
  )
}

export default page