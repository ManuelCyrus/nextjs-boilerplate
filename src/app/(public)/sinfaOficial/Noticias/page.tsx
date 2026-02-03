
"use client"

import React from 'react'
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import ServicesSection from '@/components/site-component/services-section'
import { Pill, Calculator, Zap, Globe, Code2, Palette, Headphones, Megaphone, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

const servicos = [
    {
      icone: Pill,
      titulo: "Consultoria Farmacêutica",
      descricao: "Orientação especializada para indústria e comércio farmacêutico com compliance regulatório.",
      cor: "bg-blue-50",
      corIcone: "text-blue-600",
      link:"/sinfa/consutoria-farmaceutica"
    },
    {
      icone: Calculator,
      titulo: "Contabilidade e Auditoria",
      descricao: "Serviços contábeis completos e auditorias para garantir conformidade fiscal.",
      cor: "bg-green-50",
      corIcone: "text-green-600",
      link:"/sinfa/contablidade-autoria"
    },
    {
      icone: Zap,
      titulo: "Software de Faturação",
      descricao: "Sistema robusto de faturação e gestão de vendas para seu negócio.",
      cor: "bg-yellow-50",
      corIcone: "text-yellow-600",
      link:"/sinfa/software-de-facturacao"
    },
    {
      icone: Code2,
      titulo: "Desenvolvimento de Software",
      descricao: "Aplicações personalizadas para otimizar seus processos de negócio.",
      cor: "bg-red-50",
      corIcone: "text-red-600",
      link:"/sinfa/desenvolvimento"
    },
    {
      icone: Palette,
      titulo: "Design Gráfico",
      descricao: "Identidade visual única e materiais gráficos de alta qualidade.",
      cor: "bg-pink-50",
      corIcone: "text-pink-600",
      link:"/sinfa/Design"
    },
    {
      icone: Megaphone,
      titulo: "Marketing e Publicidade",
      descricao: "Estratégias de marketing digital e campanhas publicitárias eficazes.",
      cor: "bg-orange-50",
      corIcone: "text-orange-600",
      link:"/sinfa/Marketing"
    }
  ]

export default function page() {
  const nav = useRouter()
  return (
    <main className='w-screen flex flex-col bg-white gap-8'>
       
    <section
      id="inicio"
      className="relative w-full h-[40vh] overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-claro) 100%)" }}
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Conteúdo Esquerdo */}
        <div className="space-y-8  text-white">
          <div className="space-y-4 fadeInUp 0.6s ease-out forwards">
         
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold ">
            Notícias
            </h1>
            <p className="text-xl text-gray-100 font-light">
            Soluções completas e integradas para o sucesso do seu negócio. Da consultoria ao desenvolvimento de
            software.
            </p>
          </div>
        </div>

      </div>
          <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>
    </section>

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, idx) => {
            const IconeServico = servico.icone
            return (
        <div
              key={idx}
              onClick={()=>{
                nav.push(servico.link)
              }}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <div className="w-full h-48 bg-cover bg-center" style={{ backgroundImage: `url('/banner/foto1.jpg')` }}></div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#001c46] group-hover:text-[#ef4d00] transition-colors">{servico.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mt-2">{servico.descricao}</p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <span className="text-[#ef4d00] font-semibold text-sm cursor-pointer hover:underline">
                    Saber Mais →
                  </span>
                </div>
              </div>
            </div>
            )
          })}
        </div>
    </main>
    
    </main>
  )
}
