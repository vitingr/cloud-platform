"use client"

import { database } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'

let files = collection(database, "files")
let users = collection(database, "users")

export const addFile = async (imageLink: string, name: string, folder: string, creator: any) => {
  try {
    addDoc(files, {
      imageLink: imageLink,
      name: name,
      isFolder: false,
      folder: folder,
      creator: creator
    })
  } catch (error) {
    console.log(error)
  }
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