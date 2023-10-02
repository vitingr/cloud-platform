"use client"

import React, { ChangeEvent } from 'react'
import { storage, app, database } from '@/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { addFile } from '@/utils/functions/firestore'
import ToastMessage from '../config/ToastMessage'
import { toast } from 'react-toastify'

const UploadFile = ({ handleClick, folder }: { handleClick: () => void, folder: string }) => {

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let file: any = event.target.files?.[0]

    try {
      if (file) {
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
              console.log('File available at', downloadURL);
              addFile(downloadURL, file.name, folder)
              handleClick()
              toast.success("Arquivo adicionado com sucesso!")
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
      <label htmlFor="file">
        <input type="file" name="file" id="file" onChange={(event) => uploadFile(event)} className='hidden z-40 opacity-0 absolute' />
        <button className="cta">
          <span>Adicionar Arquivo</span>
          <svg viewBox="0 0 13 10" height="10px" width="15px">
            <path d="M1,5 L11,5"></path>
            <polyline points="8 1 12 5 8 9"></polyline>
          </svg>
        </button>
      </label>
    </div>
  )
}

export default UploadFile