"use client"

import Link from 'next/link';
import React, { useState } from 'react'
import { IoDocumentText, IoEllipsisVerticalSharp, IoFolderSharp, IoShareSocial, IoPencil, IoCloudDownloadSharp, IoCopy, IoTrashBin, IoInformationCircleOutline } from 'react-icons/io5'
import Popup from '../Popup';
import ToastMessage from '../config/ToastMessage'
import { toast } from 'react-toastify'
import { database } from '@/database/firebase'
import { doc, setDoc, deleteDoc } from 'firebase/firestore'

const Files = ({ fileList, getFiles }: any) => {

  const [showFileInfo, setShowFileInfo] = useState<boolean>(false)
  const [currentFile, setCurrentFile] = useState<any>([])

  const [shareLink, setShareLink] = useState<boolean>(false)
  const [rename, setRename] = useState<boolean>(false)

  const chooseFile = async (item: any) => {
    setCurrentFile(item)
    setNewFileName(item.name)
    setShowFileInfo(true)
  }

  const [copied, setCopied] = useState("")

  const handleCopy = (file: any) => {
    setCopied(file.imageLink)
    navigator.clipboard.writeText(file.imageLink)
    setTimeout(() => setCopied(""), 3000)
    toast.success("Link Copiado para a Área de Transferências")
  }

  const [newFileName, setNewFileName] = useState<string>("")

  const editFile = async (id: string, newName: string) => {
    if (newFileName !== "") {
      try {
        const documentRef = await setDoc(doc(database, "files", id), {
          folder: currentFile.folder,
          imageLink: currentFile.imageLink,
          isFolder: currentFile.isFolder,
          name: newName
        }).then(() => {
          toast.success("Arquivo alterado com sucesso.")
          getFiles()
          setShowFileInfo(false)
        })
      } catch (error) {
        toast.error("Não foi possível salvar as alterações.")
      }
    } else {
      toast.error("Digite um nome válido.")
    }
  }

  const removeFile = async (id: string) => {
    if (id) {
      await deleteDoc(doc(database, "files", id));

      await getFiles()
      setShowFileInfo(false)
      toast.success("Arquivo removido com sucesso!")
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
        <>
          {showFileInfo ? (
            <Popup show={setShowFileInfo} title='Informações Arquivo' width="max-w-[1050px]" height="max-h-[950px]">
              <div className='w-full flex justify-between'>
                <div className='w-full p-12 flex items-center justify-center'>
                  <img src={currentFile.imageLink || "https://cdn-icons-png.flaticon.com/512/4192/4192685.png"} alt="Image" className='max-w-[450px] max-h-[550px] cursor-grab' />
                </div>
                <div className='w-[525px] flex flex-col pl-6 border-l border-neutral-200 overflow-hidden'>
                  {currentFile.isFolder ? (
                    <></>
                  ) : (
                    <li onClick={() => setShareLink(!shareLink)} className='list-none flex items-center pt-3 pb-3 pl-2 pr-2 border-b border-neutral-200 gap-2 cursor-pointer transition-all duration-300 hover:bg-neutral-100'><IoShareSocial size={17.5} />Compartilhar</li>
                  )}
                  {shareLink ? (
                    <div className='w-full flex items-center gap-4 mb-8 mt-3'>
                      <p className='w-full overflow-hidden'>https://cloudify.com/archive=kwodjwkdwjaodw</p>
                      <IoCopy size={17.5} className="cursor-pointer transition-all duration-300 hover:scale-105" onClick={() => handleCopy(currentFile)} />
                    </div>
                  ) : (<></>)}
                  <li className='list-none flex items-center pt-3 pb-3 pl-2 pr-2 border-b border-neutral-200 gap-2 cursor-pointer transition-all duration-300 hover:bg-neutral-100' onClick={() => setRename(!rename)}><IoPencil size={17.5} />Renomear</li>
                  {rename ? (
                    <form onSubmit={(e: React.SyntheticEvent) => {
                      e.preventDefault()
                      editFile(currentFile.id, newFileName)
                    }} className='w-full flex items-center gap-3 mb-10'>
                      <input type="text" name="rename" id="rename" className='w-full outline-none border-b border-neutral-500 transition-all duration-300 p-1 bg-transparent focus:border-[#6C47FF] text-sm mt-4' maxLength={40} minLength={1} onChange={(e) => setNewFileName(e.target.value)} placeholder='Digite um nome para o arquivo' value={newFileName} />
                      <button type='submit' className='pl-2 pr-2 pt-1 pb-1 rounded-lg text-white bg-[#6C47FF] transition-all duration-300 hover:bg-[#563cbd]'>Alterar</button>
                    </form>
                  ) : (<></>)}
                  {currentFile.isFolder ? (
                    <></>
                  ) : (
                    <li className='list-none flex items-center pt-3 pb-3 pl-2 pr-2 border-b border-neutral-200 gap-2 cursor-pointer transition-all duration-300 hover:bg-neutral-100'><IoCloudDownloadSharp size={17.5} />Download</li>
                  )}
                  <li className='list-none flex items-center pt-3 pb-3 pl-2 pr-2 border-b border-neutral-200 gap-2 cursor-pointer transition-all duration-300 hover:bg-neutral-100'><IoInformationCircleOutline size={17.5} />Informações Detalhadas</li>
                  <li className='list-none flex items-center pt-3 pb-3 pl-2 pr-2 border-b border-neutral-200 gap-2 cursor-pointer transition-all duration-300 hover:bg-neutral-100' onClick={() => removeFile(currentFile.id)}><IoTrashBin size={17.5} />Deletar Arquivo</li>
                </div>
              </div>
            </Popup>
          ) : (
            <></>
          )}
          <div key={item.id}>
            {item.isFolder ? (
              <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px] cursor-pointer' key={item.id}>
                <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
                  <IoDocumentText size={20} />
                  <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name || item.folderName}</h1>
                  <IoEllipsisVerticalSharp size={20} className="cursor-pointer" onClick={() => chooseFile(item)} />
                </div>
                <Link href={`/dashboard/${item.id}`} key={item.id}>
                  <div className='h-[200px] flex justify-center items-center'>
                    <IoFolderSharp size={65} />
                  </div>
                </Link>
              </div>
            ) : (
              <>
                <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px] cursor-pointer' key={item.id} onClick={() => chooseFile(item)}>
                  <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
                    <IoDocumentText size={20} />
                    <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name || item.folderName}</h1>
                    <IoEllipsisVerticalSharp size={20} className="cursor-pointer" />
                  </div>
                  <div className='h-[200px] flex justify-center items-center p-1'>
                    <img src={item.imageLink} alt="File Photo" className='w-full max-h-[200px] rounded-xl' />
                  </div>
                </div>
              </>
            )}
          </div>
        </>
      ))}
    </div>
  )
}

export default Files