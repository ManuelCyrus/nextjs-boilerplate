
"use client"

import React from 'react'
import Image from "next/image"
import { ArrowRight, CheckCircle2, Lightbulb, Target } from "lucide-react"
import ServicesSection from '@/components/site-component/services-section'
import { Pill, Calculator, Zap, Globe, Code2, Palette, Headphones, Megaphone, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react"

  const diferenciais = [
    "Experiência de mais de 10 anos no mercado",
    "Equipa especializada e certificada",
    "Soluções personalizadas para cada cliente",
    "Atendimento profissional e dedicado",
    "Tecnologia de ponta e inovação constante",
    "Resultados comprovados e mensuráveis",
  ]
     const info_ = [
        {
          icone: MapPin,
          titulo: "Localização",
          descriptions:"ONDE ESTAMOS",
          detalhes: "Zango 3, Projecto Kamgamba, Rua 16",
        },
        {
          icone: Phone,
          titulo: "Telefone",
          descriptions:"CONTACTO TELEFÓNICO",
          detalhes: "+244 975 817 186",
        },
        {
          icone: Mail,
          titulo: "EMAIL",
          descriptions:"EMAIL",
          detalhes: "sinfa373@gmail.com",
        },
      ]

  const pilares = [
    {
      icone: Target,
      titulo: "Missão",
      descricao: "Fortalecer e estruturar negócios através de soluções inovadoras, eficientes e integradas.",
    },
    {
      icone: Lightbulb,
      titulo: "Visão",
      descricao: "Ser a referência em consultoria multidisciplinar e soluções empresariais em Angola e além.",
    },
  ]
export default function page() {
  return (
    <main className='w-screen flex flex-col bg-white gap-8'>

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
                  
                    
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-white">
                      Conheça a <span className="text-secondary">SINFA</span>
                    </h2>
                                 <div className="space-y-4">
                  
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      A SINFA é uma empresa de consultoria multidisciplinar dedicada a fortalecer e estruturar negócios
                      através de soluções inovadoras e integradas.
                    </p>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      Nosso lema "Gerir para Inovar - Inovar para Crescer" reflete nosso compromisso com a excelência e o
                      desenvolvimento sustentável dos nossos clientes.
                    </p>
                  </div>
                  </div>
      
                </div>
      
              </div>
              <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>
      
            </section>
      

    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <section id="sobre" className="w-full py-20 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                {/* Imagem */}
                <div className="relative h-96 lg:h-full min-h-[450px] rounded-2xl overflow-hidden shadow-xl anima-entrada anima-flutuacao">
                  <Image src="/equipa-profissional-reuni-o-de-neg-cios-corporativ.jpg" alt="Equipa SFINFA" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent"></div>
                </div>
      
                {/* Conteúdo */}
                <div className="space-y-8 anima-entrada anima-delay-1">

      
                  {/* Lista de Diferenciais */}
                  <div className="space-y-3">
                    {diferenciais.map((diferencial, indice) => (
                      <div
                        key={indice}
                        className="flex items-start gap-3 anima-entrada"
                        style={{ animationDelay: `${indice * 0.05}s` }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                        <span className="text-foreground font-medium">{diferencial}</span>
                      </div>
                    ))}
                  </div>
      
             </div>
              </div>
      
        
            </div>
          </section>
    </main>
    

    
          <section
              id="inicio"
              className="relative w-full overflow-hidden pt-4 flex justify-center items-center h-[300px]"
              style={{ background: "linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-claro) 100%)" }}
            >


    <div className="mb-20 lg:w-[70%] w-full px-4 sm:px-6 lg:px-20 flex justify-center items-center">
           
                 {/* Pilares da Empresa */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                {pilares.map((pilar, index) => {
                  const IconePilar = pilar.icone
                  return (
               <div key={index} className="max-w-7xl border-l-[5px] border-white border-l mt-20 mx-auto px-4 sm:px-6 lg:px-8 text-2xl font-bold">
           <h1 className='text-white'>{pilar.titulo}</h1>
             <p className="text-[18px] text-white font-light mt-2">
            {pilar.descricao}
            </p>
        </div>
                  )
                })}
              </div>
           
      
              </div>

      
          
              <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>
      
            </section>
      

    </main>
  )
}
