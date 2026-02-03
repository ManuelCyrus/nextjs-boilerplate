
"use client"

import React, { cloneElement, isValidElement, ReactNode } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { FieldValues, SubmitHandler, useForm, UseFormHandleSubmit, UseFormRegister } from 'react-hook-form'
import { XCircle } from 'lucide-react'
import { Button } from '../ui/button'


interface DialogInterface {
    save: SubmitHandler<FieldValues>,
    classname?: string,
    trigger?: ReactNode
}


export default function DialogTrashAlert({ trigger, save }: DialogInterface) {

    return (
        <Dialog>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>

            <DialogContent className="sm:max-w-lg">
                <DialogHeader className="flex flex-col items-center text-center">
                    <XCircle size={48} className="text-red-500 mb-2" />
                    <DialogTitle>Tem certeza que deseja apagar?</DialogTitle>
                    <DialogDescription>
                        Esta ação é irreversível. O item será removido permanentemente.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter className="flex justify-end space-x-2">
                    <DialogClose>
                        <span 
                         className='bg-gray-300 border p-1 text-white rounded-md text-md px-3 flex items-center justify-center cursor-pointer'
                        >
                            Cancelar
                        </span>
                    </DialogClose> 

                    <button
                        className='bg-red-400 p-1 text-white rounded-md text-md px-3 flex items-center justify-center cursor-pointer'
                        onClick={save}
                    >
                        Apagar
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
