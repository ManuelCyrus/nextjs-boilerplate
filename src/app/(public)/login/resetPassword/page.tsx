"use client";

import { createAccountStore } from '@/services/createAccount.api';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export default function ResetPassword(){
    const navigation = useRouter()

     const { register, handleSubmit } = useForm();
      const [error, setError] = useState("");
      const [step, setStep] = useState<"1"|"2">("1");

      const {Create} = createAccountStore()
      const handleSignIn = async (data:any) => {
        Create(data)
        //navigation.push("/Login")
      };
    

    return (
        <div className='flex w-screen h-screen items-center justify-center'>
      <div className="flex w-[40%] max-md:w-full h-full items-center justify-center">
              <div className="rounded-2xl max-md:shadow-2xl max-w-md p-8">
                <div className="text-center mb-6">
                  <img src="/logotipo.png" alt="Logo" className="w-40 mx-auto mb-2" />
                  <h2 className="text-2xl font-bold text-gray-700">Esqueceu a senha</h2>
                  <p className="text-gray-500 text-sm">preencha os dados corretamente para recriar a sua senha!</p>
                </div>
      
                <form onSubmit={handleSubmit(handleSignIn)} className="space-y-5">
                  {
                    step=="1"?(
                        <>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="Email"
                      {...register("Email")}
                      required
                      placeholder="Digite seu Email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                      <button
                    onClick={()=>{
                        setStep("2")
                    }}
                    className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center text-white transition cursor-pointer bg-[#001c47] hover:bg-[#02122a]`}
                  >
                    Continuar
                  </button>
                  </>
                    ):(
                        <>

                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Codigo</label>
                    <input
                      type="Email"
                      {...register("Email")}
                      required
                      placeholder="Digite o codigo de veriicação"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div> 
                   <button
                    type="submit"
                    className={`w-full py-2 rounded-lg font-semibold flex items-center justify-center text-white transition cursor-pointer bg-[#001c47] hover:bg-[#02122a]`}
                  >
                    Finalizar
                  </button>
                  </>
                    )
                  }
                 
                  <div className="flex gap-2 p-2">
                    <p>-----</p>
                    <p><a onClick={()=>{
                      navigation.push(`/login`)
                    }} className="text-blue-400 cursor-pointer">fazer login </a>Ou continue com o Google</p>
                    <p>-----</p>
                  </div>
            <button
              type="submit"
              className={`p-2 border w-full rounded flex items-center justify-center`}
            >
              <img src="/google.png" alt="Google" className="h-5 w-5" />
            </button>

                </form>
      
                <div className="mt-6 text-center text-sm text-gray-500">
                  <p>© {new Date().getFullYear()} Sinfa ERP — Todos os direitos reservados.</p>
                </div>
              </div>
            </div>
        </div>
    );
}
