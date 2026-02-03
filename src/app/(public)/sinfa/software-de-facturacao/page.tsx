
"use client"

import React from 'react'
import Image from "next/image"
import { Pill, Calculator, Zap, Globe, Code2, Palette, Headphones, Megaphone, MoreHorizontal } from "lucide-react"


export default function page() {
  return (
    <main className='bg-white h-screen w-screen flex flex-col gap-3'>
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
                <Code2 size={16} className="inline mr-2" />
                Software de Faturação
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-balance leading-tight">
                Software de Faturação
              </h1>
              <p className="text-xl text-gray-100 text-pretty">
                Sistema robusto de faturação e gestão de vendas para seu negócio.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 anima-delay-2">

              <button
                className="inline-flex items-center justify-center gap-2 px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-black cursor-pointer  transition-all duration-300 transform hover:scale-105"
              >
                Conhecer Serviço
              </button>
            </div>
          </div>
        </div>
        
          <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>

      </section>

      <section className='p-10'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque maiores harum, ad corporis natus iste, modi repudiandae perferendis rerum repellendus ratione nihil facilis eum aut cumque? Necessitatibus, repellendus officiis. Illum.
      </section>

    </main>
  )
}
