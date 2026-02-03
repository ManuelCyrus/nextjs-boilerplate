"use client"

import type React from "react"

import { useState } from "react"
import { Mail, Phone, MapPin, Facebook, Send, ArrowRight, MessageCircle } from "lucide-react"

export default function ContactSection() {
  
  const [nomeCompleto, setNomeCompleto] = useState("")
  const [emailEndereco, setEmailEndereco] = useState("")
  const [mensagemTexto, setMensagemTexto] = useState("")
  const [formularioEnviado, setFormularioEnviado] = useState(false)

  const manipularEnvioFormulario = (evento: React.FormEvent) => {
    evento.preventDefault()
    setFormularioEnviado(true)
    setTimeout(() => {
      setNomeCompleto("")
      setEmailEndereco("")
      setMensagemTexto("")
      setFormularioEnviado(false)
    }, 3000)
  }

  const numeroWhatsApp = "244923456789" // Alterar com número real
  const mensagemWhatsApp = "Olá! Gostaria de mais informações sobre os seus serviços."

  const informacoesContacto = [
    {
      icone: MapPin,
      titulo: "Localização",
      detalhes: "Zango 3, Projecto Kamgamba, Rua 16",
    },
    {
      icone: Phone,
      titulo: "Telefone",
      detalhes: "+244 975 817 186",
    },
    {
      icone: Mail,
      titulo: "Email",
      detalhes: "sinfa373@gmail.com",
    },
  ]

  return (
    <section id="contacto" className="w-full py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 anima-entrada">
          <div className="inline-block badge-corporativo mb-4">Vamos conversar</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">Entre em Contacto</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para ouvir você e ajudar no crescimento do seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {informacoesContacto.map((info, indice) => {
            const IconeInfo = info.icone
            return (
              <div
                key={indice}
                className="bg-white p-8 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl hover:border-gray-200 sombra-elevada anima-entrada"
                style={{ animationDelay: `${indice * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transicao-suave">
                  <IconeInfo className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{info.titulo}</h3>
                <p className="text-muted-foreground text-sm">{info.detalhes}</p>
              </div>
            )
          })}
        </div>

        <div className="mb-16 anima-entrada">
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 border-2 border-gray-200 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary mb-2">Contacte-nos via WhatsApp</h3>
              <p className="text-muted-foreground">Resposta rápida durante horário comercial</p>
            </div>
            <a
              href={`https://api.whatsapp.com/send?phone=244975817186&text=sinfa`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-8 py-4 bg-[#25D366] hover:bg-[#20BA5A] text-white font-bold rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
            >
              <MessageCircle size={24} />
              Enviar Mensagem
            </a>
          </div>
        </div>
        {/* fim: CHANGE */}

        {/* Formulário de Contacto */}
        <div className="flex items-center justify-center w-full gap-12 anima-entrada">
    

          {/* Formulário */}
          <form onSubmit={manipularEnvioFormulario} className="space-y-6 w-full md:w-[60%]">
            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Nome Completo</label>
              <input
                type="text"
                value={nomeCompleto}
                onChange={(e) => setNomeCompleto(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all placeholder:text-muted-foreground"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Email</label>
              <input
                type="email"
                value={emailEndereco}
                onChange={(e) => setEmailEndereco(e.target.value)}
                required
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all placeholder:text-muted-foreground"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-3">Mensagem</label>
              <textarea
                value={mensagemTexto}
                onChange={(e) => setMensagemTexto(e.target.value)}
                required
                rows={5}
                className="w-full px-4 py-3 bg-input border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none placeholder:text-muted-foreground"
                placeholder="Descreva sua mensagem aqui..."
              />
            </div>

            {formularioEnviado && (
              <div className="p-4 bg-green-50 border-2 border-green-200 text-green-700 rounded-xl font-medium anima-entrada">
                Mensagem enviada com sucesso! Responderemos em breve.
              </div>
            )}

            <button type="submit" className="w-full btn-secundario flex items-center justify-center gap-2">
              Enviar Mensagem
              <ArrowRight size={20} />
            </button>
          </form>
        </div>

      </div>
    </section>
  )
}
