
"use client"

import React from 'react'
import Image from "next/image"
import { ArrowRight, CheckCircle, Download, Palette } from "lucide-react"
import { Button } from '@/components/ui/button'
import DialogCompoent from '@/components/Dialog.component/Dialog.component'
import { FieldValues, useForm, UseFormRegister } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import DialogbuyServicesCompoent from '@/components/Dialog.component/Dialog.buyServices.component'



export const Form = ({
  register,
}: {
  register: UseFormRegister<FieldValues>;
  type?: "create" | "Edit";
}) => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>{"Nome do produto"}</Label>
          <Input
            {...register("name")}
            placeholder="Nome do produto"
          />
        </div>
      </section>

    </main>
  );
};




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
                <Palette size={16} className="inline mr-2" />
                Design
              </div>


              <h1 className="text-md sm:text-xl lg:text-2xl font-semibold text-balance leading-tight">
                Design Gráfico
              </h1>
              <p className="text-xl text-gray-100 text-pretty">
                Estabelecer o SINFA como parceiro estratégico de design para empresas, oferecendo soluções visuais consistentes e gestão profissional de presença digital, garantindo comunicação alinhada, moderna e orientada para resultados.
              </p>
            </div>

          </div>

        </div>
        <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>

      </section>

      <section className='p-10'>


        <main className="max-w-7xl mx-auto gap-10 px-4 sm:px-6 lg:px-8 pt-20">
 <h1 className='text-4xl font-bold p-6'>Nossos Serviços</h1>
          <div className="w-full flex md:flex-row flex-col group cursor-pointer p-2 rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Image
              src={"/images/img1.jpg"}
              width={200}
              height={200}
              alt='image'
              className='rounded-md md:w-[200px] w-full'
            />

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#001c46] group-hover:text-[#ef4d00] transition-colors">Identidade Visual</h3>

              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
              {["Criação ou renovação de logotipo",
                "Definição de paleta de cores e tipografia",
                "Construção do manual básico de marca",
                "Mockups institucionais (cartões, papel timbrado, assinaturas digitais)",
                "Arquivos finais organizados em formatos profissionais (PDF, PNG, SVG)"]
                .map((item, index) => (
                  <div key={index} className='flex mt-2 gap-4 items-center'>
                    <div className='p-2 text-orange-400 rounded-md font-bold text-4xl'>{index+1}</div>
                    <p>{item}</p>
                  </div>
                ))

              }
               </div>
            </div>
          </div>


          <div className="w-full mt-10 flex md:flex-row flex-col p-2 group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Image
              src={"/images/img1.jpg"}
              width={200}
              height={200}
              alt='image'
              className='rounded-md md:w-[200px] w-full'
            />

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#001c46] group-hover:text-[#ef4d00] transition-colors">Gestão de Redes Sociais (com Postplane)</h3>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-6 w-full'>
              {["Planeamento mensal de conteúdo",
                "Criação de artes e copywriting para publicações",
                "Gestão do calendário editorial",
                "Programação automática de posts via Postplane",
                "Monitorização básica de desempenho",
                "Identidade visual aplicada de forma consistente em todas as publicações"]
                .map((item, index) => (
                  <div key={index} className='flex mt-2 gap-4 items-center'>
                    <div className='p-2 text-orange-400 rounded-md font-bold text-4xl'>{index+1}</div>
                    <p>{item}</p>
                  </div>
                ))

              }</div>
            </div>
          </div>

        </main>

        <main className="max-w-7xl mx-auto gap-10 px-4 sm:px-6 lg:px-8 pt-20">

          <div className='flex flex-col gap-4 items-center justify-center w-full'>
            <h1 className='text-4xl font-bold'>Preços</h1>
            <p className='text-center'>Os nossos planos foram estruturados para responder às necessidades reais <br></br> das empresas, garantindo qualidade, eficiência e previsibilidade de custos.
              <br></br> Escolha a opção que melhor se adapta aos seus objetivos e tenha acesso a serviços <br></br> profissionais, com suporte dedicado e entrega focada em resultados.</p>
            <div className='mt-4 w-full flex md:flex-row flex-col justify-center items-center'>
              <section className='border-t w-full flex flex-col items-center justify-center rounded-md border-gray-100 p-4 gap-4'>
                <p className='text-xl uppercase '>Identidade visual</p>
                <div className='mt-10 w-full flex items-center flex-col gap-6'>
                  <p className='uppercase text-md'>Apartir de </p>
                  <div className='flex gap-4 items-center w-full md:flex-row flex-col '>
                    <p className='uppercase  text-center w-full  p-4 bg-orange-400 text-white font-bold text-xl rounded'>50.000.00 AOA</p>
                    <p className='uppercase  text-center w-full p-4 bg-orange-400 text-white not-first-of-type:font-bold text-xl rounded'>a  150.000.00 AOA</p>
                  </div>  </div>
              </section>

              <section className='w-full border-t flex flex-col items-center justify-center rounded-md border-gray-100 p-4 gap-4'>
                <p className='text-xl uppercase '>Gestão de Redes Sociais</p>
                <div className='mt-10 w-full flex items-center flex-col gap-2 justify-between'>
                  <p className='uppercase text-md'>Apartir de </p>
                  <div className='w-full flex gap-4 items-center md:flex-row flex-col '>
                    <p className='uppercase w-full text-center p-4 bg-orange-400 text-white font-bold text-xl rounded'>120.000.00 AOA</p>
                    <p className='uppercase w-full text-center p-4 bg-orange-400 text-white font-bold text-xl rounded'>a  300.000.00 AOA</p>
                  </div>  </div>
              </section>
            </div>
          </div>

        </main>


        <main className="max-w-7xl mx-auto gap-10 px-4 sm:px-6 lg:px-8 pt-30 pb-30">

          <div className='flex flex-col gap-4 items-center justify-center w-full'>
            <h1 className='text-4xl font-bold text-center'>Baixe o nosso Portfólio Comercial</h1>
            <p className='text-center'>Conheça em detalhe os nossos serviços, soluções e projetos.<br></br>
              Faça o download do portfólio comercial e descubra como podemos agregar valor ao seu negócio.</p>

          </div>
          <div className='w-full flex items-center justify-center mt-10'>
            <a href="/portfolio-comercial.pdf" download>
              <Button className='p-6 hover:bg-black/70 bg-black text-white text-xl w-[300px]'>
                <Download /> Baixar (PDF)
              </Button></a>
          </div>

             <div className='w-full flex items-center justify-center mt-10'>
            <DialogbuyServicesCompoent
            title='Comprar serviços'
            titleButton='Comprar serviço'
              description='Adiciona os dados corretos para comprar serviços'
            handleSubmit={handleSubmit}
            register={register}
            save={handleSaveUser}
            classname='p-6 hover:bg-black/70 bg-black text-white text-xl w-[300px]'
            children={
                <Form
                                        register={register}
                                      />
            }
            />
              

          </div>

        </main>


      </section>

    </main>
  )
}
