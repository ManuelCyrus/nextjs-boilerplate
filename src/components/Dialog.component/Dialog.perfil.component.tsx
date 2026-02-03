
"use client"

import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'


interface DialogInterface {
   classname?:string, 
   description?: string, 
   title?: string, 
   children: ReactNode, 
   titleButton?: string,
   icon?:ReactNode
   trigger?:ReactNode
   onClickButtonTrigger?:()=>void
}


export default function DialogPerfilCompoent({onClickButtonTrigger,trigger,classname,icon, description, title, children, titleButton }: DialogInterface) {
   
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    trigger?trigger:(
                    <div onClick={onClickButtonTrigger} className='bg-black p-2 text-white rounded-md text-md px-3 flex gap-1 cursor-pointer'>
                    {icon}{titleButton}
                    </div> 
                    )
                } 
         </DialogTrigger>

            <DialogContent className='max-w-[90%] bg-white text-black border border-gray-100 w-[1500px]'>
               
                <DialogHeader className=''>
                     <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
               {children}
            </DialogContent>

        </Dialog>
    )
}
