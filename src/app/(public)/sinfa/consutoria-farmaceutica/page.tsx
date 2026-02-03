
"use client"

import React from 'react'
import Image from "next/image"
import { Pill, Calculator, Zap, Globe, Code2, Palette, Headphones, Megaphone, MoreHorizontal, Download } from "lucide-react"
import DialogbuyServicesCompoent from '@/components/Dialog.component/Dialog.buyServices.component'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'


export default function page() {


    const { register, handleSubmit, reset } = useForm();
    
      const handleSaveUser = async (data: any) => {
        
      };


  return (
      <main className='bg-white w-screen flex flex-col gap-3'>
        <section
          id="inicio"
          className="relative w-full overflow-hidden pt-4"
          style={{ background: "linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-claro) 100%)" }}
        >
          {/* Padrão de fundo animado */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0 animate-float"
              style={{
                backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)",
              }}
            ></div>
          </div>
  
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Conteúdo Esquerdo */}
            <div className="space-y-8 text-white">
              <div className="space-y-4 animate-entrada">
                <div className="badge-corporativo">
                  <Pill size={16} className="inline mr-2" />
                  Consultoria Farmacêutica
                </div>
  
  
                <h1 className="text-md sm:text-xl lg:text-2xl font-semibold text-balance leading-tight">
                 Consultoria Farmacêutica
                </h1>
                <p className="text-xl text-gray-100 text-pretty">
         A Consultoria Farmacêutica é um serviço estratégico desenvolvido para legalizar e 
estruturar farmácias, garantindo o enquadramento das suas atividades às normas legais e 
regulatórias vigentes.  
 </p>
              </div>
  
            </div>
  
          </div>
          <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>
  
        </section>
  
        <section className='p-10'>
  
  
          <main className="max-w-4xl mx-auto gap-10 px-4 sm:px-6 lg:px-8 pt-20 flex items-center flex-col">
   <h1 className='text-4xl font-bold p-6'>Processo de regularização e licenciamento</h1>
            <div className="w-full flex md:flex-row flex-col group cursor-pointer p-2 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
        
              <div className="p-6">
               
                <div className='w-full'>
                
                    <div className='w-full items-center'>
                    <p>  Atuamos desde o processo de regularização e licenciamento, passando pela organização 
técnica e operacional, até à implementação de boas práticas farmacêuticas. </p>
                    </div>
                
                 </div>
              </div>

              
            </div>

                  <div className="p-6">
               
                <div className='w-full'>
                
                    <div className='w-full items-center'>
                    <p> 
                    Por meio de uma abordagem técnica e orientada para resultados, <b className='text-orange-500'>a consultoria</b> permite  <b  className='text-orange-500'>otimizar 
as vendas, reduzir perdas por obsolescência ou ruturas de stock</b>, melhorar a gestão de <br></br>
compras e assegurar a <b  className='text-orange-500'>disponibilidade contínua e adequada de produtos</b>. Oferecemos ainda <br></br>
<b  className='text-orange-500'>orientação técnica sobre o funcionamento da farmácia</b>, capacitando a equipa e fortalecendo <br></br>
a eficiência, a credibilidade e a sustentabilidade do negócio.   
                     </p>
                    </div>
                
                 </div>
              </div>
  
  
            <div className="w-full mt-10 flex md:flex-row flex-col p-2 group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#001c46] group-hover:text-[#ef4d00] transition-colors">Tipos de estabelecimentos legalizados por nós </h3>
               
               <p>Prestamos serviços de consultoria e legalização para diferentes modelos de estabelecimentos  <br></br>
do setor farmacêutico e da saúde, assegurando total conformidade com as normas legais e <br></br>
regulatórias: </p>
<Separator/>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
                {["Farmácias de 2ª e 3ª classe",
"Depósitos farmacêuticos",  
"Lojas de suplementos alimentares"]
                  .map((item, index) => (
                    <div key={index} className='flex mt-2 gap-4 items-center'>
                      <div className='p-2 text-orange-400 rounded-md font-bold text-4xl'>{index+1}</div>
                      <p>{item}</p>
                    </div>
                  ))
  
                }</div>
              </div>
            </div>


            
           <div className="p-6">
               
                <div className='w-full'>
                
                    <div className='w-full items-center'>
                    <p> 
                 Garantimos o enquadramento técnico-legal adequado a cada tipologia, com orientação <br></br>
especializada desde o licenciamento até à organização e funcionamento do estabelecimento. 
                     </p>
                    </div>
                
                 </div>
              </div>
          </main>


               
  


  
        </section>
  
      </main>
  )
}
