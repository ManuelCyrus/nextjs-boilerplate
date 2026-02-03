
"use client"

import React from 'react'
import Image from "next/image"
import { Mail, Phone, MapPin, ArrowRight, MessageCircle } from "lucide-react"
import { useRouter } from "next/navigation"


export default function page() {

      const numeroWhatsApp = "244923456789" // Alterar com número real
      const mensagemWhatsApp = "Olá! Gostaria de mais informações sobre os seus serviços."
    
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

  const nav = useRouter()
  return (
    <main className='w-screen flex flex-col bg-white'>
       
    <section
      id="inicio"
      className="relative w-full h-[40vh] overflow-hidden"
      style={{ background: "linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-claro) 100%)" }}
    >

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Conteúdo Esquerdo */}
        <div className="space-y-8  text-white">
          <div className="space-y-4 fadeInUp 0.6s ease-out forwards">
         
            <h1 className="text-md sm:text-xl lg:text-4xl font-semibold ">
             Entre em Contacto
            </h1>
            <p className="text-xl text-gray-100 font-light">
             Estamos prontos para ouvir você e ajudar no crescimento do seu negócio.
            </p>
          </div>
        </div>

      </div>
          <div className="absolute inset-0 bg-cover bg-left bg-[url('/images/linhas.png')]  opacity-40"></div>
    </section>
<main className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-4">
   <section id="contacto" className="w-full bg-white">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">

   
        {/* fim: CHANGE */}

        {/* Formulário de Contacto */}
        <div className="flex items-center justify-center w-full gap-12 anima-entrada">
    

          {/* Formulário */}
          <form className="space-y-6 w-full md:w-[60%] border rounded-2xl p-10 border-gray-200">
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Nome Completo</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl  transition-all placeholder:text-muted-foreground"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl transition-all placeholder:text-muted-foreground"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Mensagem</label>
              <textarea
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl transition-all resize-none placeholder:text-muted-foreground"
                placeholder="Descreva sua mensagem aqui..."
              />
            </div>

            <button type="submit" className="w-full bg-amber-600 p-2 rounded-md text-white cursor-pointer flex items-center justify-center gap-2">
              Enviar Mensagem
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

      </div>
    </section>
    </main>

    </main>
  )
}
