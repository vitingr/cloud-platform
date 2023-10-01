import React from 'react'
import { IoDocumentText, IoEllipsisVerticalSharp, IoFolderSharp } from 'react-icons/io5'

const Files = ({ fileList }: any) => {

  return (
    <div className='flex flex-wrap gap-8 mt-24'>
      {fileList.map((item: {
        imageLink: string;
        id: string;
        name: string;
        folderName: string;
        isFolder: boolean;
        fileList: object;
      }) => (
        <div className='p-2 bg-[#e2e7ec] rounded-xl w-[200px] cursor-pointer' key={item.id}>
          <div className='h-[30px] w-full flex justify-between p-1 gap-2 overflow-hidden'>
            <IoDocumentText size={20} />
            <h1 className='w-full max-w-[133px] overflow-hidden'>{item.name || item.folderName}</h1>
            <IoEllipsisVerticalSharp size={20} className="cursor-pointer" />
          </div>
          <div className='h-[200px] flex justify-center items-center'>
            {item.isFolder ? (
              <IoFolderSharp size={65} />
            ) : (
              <img src={item.imageLink} alt="File Photo" className='w-full h-[200px] rounded-xl' />
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Files