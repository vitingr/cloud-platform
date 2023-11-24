"use client"

import React, { ChangeEvent } from 'react'
import { storage, app, database } from '@/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addFile } from '@/utils/functions/firestore'
import ToastMessage from '../config/ToastMessage'
import { toast } from 'react-toastify'
import { useSession } from 'next-auth/react'

const UploadFile = ({ getFiles, folder }: { getFiles: () => void, folder: string }) => {

  const { data: session, status } = useSession()

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let file: any = event.target.files?.[0]

    try {
      if (file && session != undefined && status === "authenticated") {
        const storageRef = ref(storage, `files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          },
          (error) => {
            console.log(error)
            throw new Error("ERRO! Não foi possível enviar o arquivo")
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
              addFile(downloadURL, file.name, folder, session?.user?.email)
              toast.success("Arquivo adicionado com sucesso!")
              console.log("fetching data")
              getFiles()
            });
          }
        )
      }
    } catch (error) {
      throw new Error("ERRO! Não foi possível enviar o arquivo")
    }
  }

  return (
    <div>
      <ToastMessage />
      <button className="cta">
        <label htmlFor="file" className='flex gap-2 items-center cursor-pointer'>
          <span>Adicionar Arquivo</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </label>
        <input type="file" name="file" id="file" onChange={(event) => uploadFile(event)} className='hidden z-40 opacity-0 absolute' />
      </button>
    </div>
  )
}

export default UploadFile