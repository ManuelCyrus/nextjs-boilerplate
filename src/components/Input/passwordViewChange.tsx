import { Eye, EyeClosed } from 'lucide-react'
import React, { ReactNode, useState } from 'react'

export default function InputPasswordType({children,setModifyTypeInput}:{children:ReactNode,setModifyTypeInput?:React.Dispatch<React.SetStateAction<boolean>>|any}) {

    const[viewText,setViewText] = useState<boolean>(false)

    const CloseEye = ()=>{
        setViewText(false)
        setModifyTypeInput(false)
    }

    const OpenEye =  ()=>{
        setViewText(true)
        setModifyTypeInput(true)
    }
  return (
        <div className="flex relative w-full border items-center border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
              {
                children
              }
              <div className='absolute ml-[90%] text-sm'>
               {viewText?<Eye size={16}  onClick={CloseEye}/>:<EyeClosed size={16} onClick={OpenEye}/>} 
              </div>
      </div>
  )
}
