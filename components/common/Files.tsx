"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { IoDocumentText, IoEllipsisVerticalSharp, IoFolderSharp, IoShareSocial, IoPencil, IoCloudDownloadSharp, IoCopy } from 'react-icons/io5'
import Popup from '../Popup';
import ToastMessage from '../config/ToastMessage'
import { toast } from 'react-toastify'
import { database } from '@/database/firebase'
import { collection, doc } from 'firebase/firestore'
import { ArrayType } from '@/types'

const Files = ({ fileList }: any) => {

  const [showFileInfo, setShowFileInfo] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<any>([])

  const [shareLink, setShareLink] = useState<boolean>(false)
  const [rename, setRename] = useState<boolean>(false)

  const chooseFile = async (item: any) => {
    setCurrentFile(item)
    setShowFileInfo(true)
  }

  const [copied, setCopied] = useState("")

  const handleCopy = (file: any) => {
    setCopied(file.imageLink)
    navigator.clipboard.writeText(file.imageLink)
    setTimeout(() => setCopied(""), 3000)
  }

  const [newFileName, setNewFileName] = useState<string>("")
  
  const editFile = async (id: string, newName: string) => {
    if (newFileName !== "") {
      const collectionRef: any = collection(database, "files")
      const documentRef = collectionRef.doc(id).update({
        name: newName
      }).then(() => {
        toast.success("Arquivo alterado com sucesso!")
      }).catch((error: string) => {
        console.log(error)
        toast.error("Não foi possível editar o arquivo.")
      })
    } else {
      toast.error("Digite um nome válido.")
    }
  }

  return (
    <div className='flex flex-wrap justify-center gap-12 mt-24'>
      <ToastMessage />
      {fileList.map((item: {
        imageLink: string;
        id: string;
        name: string;
        folderName: string;
        isFolder: boolean;
        fileList: object;
      }) => (
        <div>
          {item.isFolder ? (
            <Link href={`/dashboard/${item.id}`} key={item.id}>
              <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px] cursor-pointer' key={item.id}>
                <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
                  <IoDocumentText size={20} />
                  <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name || item.folderName}</h1>
                  <IoEllipsisVerticalSharp size={20} className="cursor-pointer" />
                </div>
                <div className='h-[200px] flex justify-center items-center'>
                  <IoFolderSharp size={65} />
                </div>
              </div>
            </Link>
          ) : (
            <>
              {showFileInfo ? (
                <Popup show={setShowFileInfo} title='Informações Arquivo' width="max-w-[1050px]" height="max-h-[950px]">
                  <div className='w-full flex justify-between'>
                    <div className='w-full p-12 flex items-center justify-center'>
                      <img src={currentFile.imageLink} alt="Image" className='max-w-[550px] max-h-[750px]' />
                    </div>
                    <div className='w-[400px] flex flex-col gap-4 pl-6 border-l border-neutral-200 overflow-hidden'>
                      <li onClick={() => setShareLink(!shareLink)} className='list-none flex items-center gap-2 border-b border-neutral-200 pb-2 cursor-pointer'><IoShareSocial size={17.5} />Compartilhar</li>
                      {shareLink ? (
                        <div className='w-full flex items-center gap-4 mb-10'>
                          <p className='w-full overflow-hidden'>https://cloudify.com/archive=kwodjwkdwjaodw</p>
                          <IoCopy size={17.5} className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => handleCopy(currentFile)} />
                        </div>
                      ) : (<></>)}
                      <li className='list-none flex items-center gap-2 border-b border-neutral-200 pb-2 cursor-pointer' onClick={() => setRename(!rename)}><IoPencil size={17.5} />Renomear</li>
                      {rename ? (
                        <form onSubmit={(e: React.SyntheticEvent) => {
                          e.preventDefault()
                          editFile(currentFile.id, newFileName)
                        }} className='w-full flex items-center gap-4 mb-10'>
                          <input type="text" name="rename" id="rename" className='w-full outline-none border-b border-neutral-500 transition-all duration-300 p-1 bg-transparent focus:border-[#6C47FF] text-sm' maxLength={40} minLength={1} onChange={(e) => setNewFileName(e.target.value)} placeholder='Digite um nome para o arquivo' />
                          <button type='submit' className='pl-2 pr-2 pt-1 pb-1 rounded-lg text-white bg-[#6C47FF] transition-all duration-300 hover:bg-[#563cbd]'>Alterar</button>
                        </form>
                      ) : (<></>)}
                      <li className='list-none flex items-center gap-2 border-b border-neutral-200 pb-2 cursor-pointer'><IoCloudDownloadSharp size={17.5} />Download</li>
                      <li className='list-none flex items-center gap-2 border-b border-neutral-200 pb-2 cursor-pointer'><IoShareSocial size={17.5} />Compartilhar</li>
                      <li className='list-none flex items-center gap-2 border-b border-neutral-200 pb-2 cursor-pointer'><IoShareSocial size={17.5} />Compartilhar</li>
                    </div>
                  </div>
                </Popup>
              ) : (
                <></>
              )}
              <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px] cursor-pointer' key={item.id} onClick={() => chooseFile(item)}>
                <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
                  <IoDocumentText size={20} />
                  <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name || item.folderName}</h1>
                  <IoEllipsisVerticalSharp size={20} className="cursor-pointer" />
                </div>
                <div className='h-[200px] flex justify-center items-center'>
                  <img src={item.imageLink} alt="File Photo" className='w-full h-[200px] rounded-xl' />
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  )
}

export default Files