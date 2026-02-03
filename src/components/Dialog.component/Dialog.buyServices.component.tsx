
"use client"

import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { Separator } from '../ui/separator'
import { Save, XCircle } from 'lucide-react'


interface DialogInterface {
   register: UseFormRegister<FieldValues>, 
   save:SubmitHandler<FieldValues>,
   classname?:string, 
   description?: string, 
   title?: string, 
   children: ReactNode, 
   titleButton?: string,
   icon?:ReactNode
   handleSubmit: UseFormHandleSubmit<FieldValues>;
   trigger?:ReactNode
   onClickButtonTrigger?:()=>void,
   max?:boolean
}


export default function DialogbuyServicesCompoent({max,onClickButtonTrigger,trigger,handleSubmit,register,classname, save,icon, description, title, children, titleButton }: DialogInterface) {
   
    return (
        <Dialog>
            <DialogTrigger asChild>
                {
                    trigger?trigger:(
                    <div onClick={onClickButtonTrigger} className='p-6 hover:bg-black/70  bg-black text-white rounded flex items-center justify-center h-[50px] text-xl w-[300px]'>
                    <p>{icon}</p>
                    <p className='hidden md:block'>{titleButton}</p>
                    
                    </div> 
                    )
                } 
         </DialogTrigger>

            <DialogContent className={`${max?"sm:max-w-4xl  max-w-[95%]":"" } border-gray-100  bg-white text-black border outline-none`}>
               
                <DialogHeader className='w-full'>
                     <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                </DialogHeader>
               
                <form onSubmit={handleSubmit(save)}  className="flex  flex-col gap-2">
               <main className='px-5 flex  flex-col gap-2'>
                 {children}
               </main>
               
              
                  <DialogFooter>
                    <DialogClose asChild>
                    <span className='bg-black cursor-pointer p-1 px-3 text-white rounded-md flex items-center gap-2 justify-center'>
                       <XCircle size={16} /> Cancelar
                    </span>
                    </DialogClose>
                        <button type='submit' className='bg-blue-800 px-3 p-1 text-white rounded-md text-md flex items-center justify-center cursor-pointer gap-2'>Comprar</button>
                </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}
