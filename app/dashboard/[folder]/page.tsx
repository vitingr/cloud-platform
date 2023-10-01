"use client"

import React from 'react'
import { usePathname } from 'next/navigation'

const page = () => {

  const pathname = usePathname().split("/")
  const query = pathname[2]

  return (
    <div>
      {query}
    </div>
  )
}

export default page