"use client"

import { database } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'

let files = collection(database, "files")

export const addFile = async (imageLink: string, name: string) => {
  try {
    addDoc(files, {
      imageLink: imageLink,
      name: name,
      isFolder: false
    })
  } catch (error) {
    console.log(error)
  }
}

export const addFolder = async (payload: {
  folderName: string, isFolder: boolean, fileList: object
}) => {
  try {
    addDoc(files, {
      folderName: payload.folderName,
      isFolder: payload.isFolder,
      FileList: payload.fileList
    })
  } catch (error) {
    throw new Error("ERRO! Não foi possível adicionar a pasta")
  }
}