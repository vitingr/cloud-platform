import { NextApiRequest, NextApiResponse } from "next";
import { storage, app, database } from '@/database/firebase'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'

export const POST = async (request: Request) => {
  try {
    const { file } = await request.json()

    if (!file) {
      throw new Error("O campo file está vazio")
    }

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
        throw new Error("ERRO! Não foi possível enviar o arquivo")
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log('File available at', downloadURL);
          
        });
      }
    )

    return new Response("TESTE", { status: 500 })

  } catch (error) {
    console.log(error)
    return new Response("TESTE", { status: 500 })
  }
}