"use client"

import { database } from '@/database/firebase'
import { collection, addDoc } from 'firebase/firestore'

let files = collection(database, "files")

export const addFile = async (imageLink: string, name: string) => {
  try {
    addDoc(files, {
      imageLink: imageLink,
      name: name
    })
  } catch (error) {
    console.log(error)
  }
}