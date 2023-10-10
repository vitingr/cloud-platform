"use client"

import { database, storage } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'
import { getMetadata, ref } from 'firebase/storage'

let files = collection(database, "files")
let users = collection(database, "users")

export const addFile = async (imageLink: string, name: string, folder: string, creator: any) => {

  let fileRef = ref(storage, `files/${name}`)
  let fileType = ""

  getMetadata(fileRef).then((metadata) => {

    let fileInfo = metadata.contentType?.split("/")[1]

    if (fileInfo?.includes("pdf")) {
      fileType = "pdf"
    }
    if (fileInfo?.includes("word")) {
      fileType = "word"
    }
    if (fileInfo?.includes("presentation")) {
      fileType = "powerpoint"
    }
    if (fileInfo?.includes("spreadsheet")) {
      fileType = "excel"
    }
    if (fileInfo?.includes("png") || fileInfo?.includes("jpg") || fileInfo?.includes("jpeg") || fileInfo?.includes("gif") || fileInfo?.includes("bmp") || fileInfo?.includes("svg")) {
      fileType = "img"
    }

    try {
      addDoc(files, {
        imageLink: imageLink,
        name: name,
        isFolder: false,
        folder: folder,
        creator: creator,
        fileType: fileType,
        favorite: false
      })
    } catch (error) {
      console.log(error)
    }

  }).catch((error) => {
    console.log(error)
    throw new Error(`ERRO ao verificar o formato do arquivo! ${error}`)
  })
}

export const addFolder = async (payload: {
  folderName: string, isFolder: boolean, fileList: object, folder: string, creator: any
}) => {
  try {
    addDoc(files, {
      folderName: payload.folderName,
      isFolder: payload.isFolder,
      FileList: payload.fileList,
      folder: payload.folder,
      creator: payload.creator
    })
  } catch (error) {
    throw new Error("ERRO! Não foi possível adicionar a pasta!")
  }
}

export const addUser = async (userInfo: {
  name: string, email: string, image: string
}) => {
  try {
    addDoc(users, {
      name: userInfo.name,
      email: userInfo.email,
      image: userInfo.image
    })
  } catch (error) {
    throw new Error("Erro não foi possível criar o usuário!")
  }
}