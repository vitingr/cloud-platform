"use client"

import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { addFolder } from '@/utils/functions/firestore'
import { database } from '@/database/firebase'
import { collection, onSnapshot } from 'firebase/firestore'
import { ArrayType } from '@/types'
import { IoAddOutline, IoSearch, IoArrowBackSharp } from 'react-icons/io5'
import Files from '@/components/common/Files'
import UploadFile from '@/components/common/UploadFile'
import Popup from '@/components/Popup'
import Link from 'next/link'
import ToastMessage from '@/components/config/ToastMessage'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

let files = collection(database, "files")

const page = () => {

  const { data: session, status } = useSession()

  const pathname = usePathname().split("/")
  const idFolder = pathname[2]

  const [isCreateFolderVisible, setCreateFolderVisible] = useState<boolean>(false)
  const [folderName, setFolderName] = useState<string>("")
  const [description, setDescription] = useState<string>("")

  const [fileList, setFileList] = useState<ArrayType | any>([])

  const getFiles = async () => {
    const newFileList: any = [];

    if (session != undefined && status === "authenticated") {
      onSnapshot(files, (response) => {
        response.docs.forEach((item) => {
          let value = { ...item.data() }
          if (value.folder === idFolder && value.creator === session?.user?.email) {
            newFileList.push({ ...item.data(), id: item.id });
          } else {
            return
          }
        });
        setFileList(newFileList);
      });
    }
  };

  const createFolder = async () => {
    if (folderName !== "" && description !== "" && session != undefined && status === "authenticated") {
      let payload = {
        folderName: folderName,
        isFolder: true,
        fileList: [],
        folder: `${idFolder}`,
        creator: session?.user?.email
      }

      addFolder(payload)
      setCreateFolderVisible(false)
      getFiles()
      toast.success("Sucesso! A pasta foi criada.")
    }
  }

  useEffect(() => {
    getFiles()
  }, [])

  return (
    <div className='w-full flex flex-col p-[5%] max-w-[1600px]'>
      <ToastMessage />
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

      <Link href="javascript:history.go(-1)">
        <div className='mt-16 flex items-center gap-2 cursor-pointer'>
          <IoArrowBackSharp size={20} />
          <h3 className='text-neutral-500'>Pasta Anterior</h3>
        </div>
      </Link>

      <Files fileList={fileList} getFiles={getFiles} />

      <div className='mt-32'>
        <UploadFile handleClick={getFiles} folder={idFolder} />
      </div>

      {
        isCreateFolderVisible ? (
          <Popup title='Adicionar Pasta' show={setCreateFolderVisible} width='w-[450px]' height='w-[650px]' >
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
        )
      }

    </div >
  )
}

export default page