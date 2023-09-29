"use client"

import React, { ChangeEvent, useState } from 'react'
import Button from '../Button'

const UploadFile = () => {
  
  const [file, setFile] = useState({})

  const uploadFile = async (event: ChangeEvent<HTMLInputElement>) => {
    let files = event.target.files?.[0]
    console.log(files)
  }

  return (
    <div>
      <input type="file" name="file" id="file" onChange={(event) => uploadFile(event)} />
      <button>
        Clique
      </button>
    </div>
  )
}

export default UploadFile