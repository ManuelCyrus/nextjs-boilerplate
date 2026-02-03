"use client"

import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, MessageCircle} from "lucide-react"
import { FaFacebook, FaLinkedin, FaYoutube, FaInstagram, FaTwitter } from "react-icons/fa"

export default function FooterSite() {
  const anoAtual = new Date().getFullYear()
  const numeroWhatsApp = "244923456789"
  
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

  return (
    <>
     <main className="w-full bg-orange-500">
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-8 p-20">
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {info_.map((info, indice) => {
                const IconeInfo = info.icone
                return (
                  <div
                    key={indice}
                    className="text-white h-full flex items-center p-8 rounded-2xl gap-8"
                    style={{ animationDelay: `${indice * 0.1}s` }}
                  >
                    <div className="w-20 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-secondary/20 transicao-suave">
                      <IconeInfo className="w-16 h-16 font-light" />
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-primary mb-2">{info.descriptions}</h3>
                    <p className="text-muted-foreground text-sm">{info.detalhes}</p>
                    </div>
                    
                  </div>
                )
              })}
            </div>
    
    </main>
 </main>
    <footer className="relative bg-[#0B1221] text-white pt-16 pb-8 text-sm font-sans overflow-hidden">

      {/* BACKGROUND DO PRIMEIRO DESIGN */}
      <div className="absolute inset-0 bg-cover bg-left opacity-30 bg-[url('/images/linhas.png')]" />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">

        {/* GRID PRINCIPAL */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">

          {/* COLUNA 1: LOGO + TEXTO */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logotipobranco.png"
                alt="Logo"
                width={150}
                height={150}
                className="object-contain"
              />
            </Link>

            <p className="text-gray-400 leading-relaxed text-sm">
              Gerir para Inovar. Inovar para Crescer. Fortalecemos e estruturamos negócios com soluções inovadoras.
            </p>

            {/* APPS */}
            <div className="pt-6">
              <h4 className="text-white font-semibold mb-3">Descarregue as nossas apps</h4>
              <div className="flex gap-2">
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Google Play"
                    className="h-10"
                  />
                </a>
                <a href="#" className="opacity-90 hover:opacity-100 transition-opacity">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                    alt="App Store"
                    className="h-10"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA 2–5: LINKS */}
          <div className="lg:col-span-9 grid grid-cols-2 md:grid-cols-4 gap-8">

            {/* SOBRE */}
            <div>
              <h4 className="font-bold mb-4 text-white">Sobre a Empresa</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400 transition">Quem Somos</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">Serviços</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">Planos</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">Carreiras</Link></li>
              </ul>
            </div>

            {/* RECURSOS */}
            <div>
              <h4 className="font-bold mb-4 text-white">Recursos</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400 transition">Documentação</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">API</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">Atualizações</Link></li>
              </ul>
            </div>

            {/* SOLUÇÕES */}
            <div>
              <h4 className="font-bold mb-4 text-white">Soluções</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-emerald-400 transition">Gestão Comercial</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">POS</Link></li>
                <li><Link href="#" className="hover:text-emerald-400 transition">Relatórios</Link></li>
              </ul>
            </div>

            {/* CONTACTOS */}
            <div>
              <h4 className="font-bold mb-4 text-white">Contactos</h4>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex gap-3"><MapPin size={18} /> Zango 3, Rua 16</li>
                <li className="flex gap-3"><Phone size={18} /> +244 975 817 186</li>
                <li className="flex gap-3"><Mail size={18} /> sinfa373@gmail.com</li>
              </ul>
            </div>

          </div>
        </div>

        {/* RODAPÉ INFERIOR */}
        <div className="border-t border-gray-800 pt-8 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

          <div className="space-y-1 text-gray-500 text-xs">
            <p>© {anoAtual} SINFA. Todos os direitos reservados.</p>
            <p className="font-semibold text-gray-400">A plataforma será lançada em breve</p>
          </div>

          <div className="flex flex-col items-end gap-2">
            <span className="text-gray-500 text-xs">Mais fácil é com <span className="text-white font-semibold">SinfaGest</span></span>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-white transition"><FaFacebook size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaLinkedin size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaYoutube size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaInstagram size={18} /></a>
              <a href="#" className="hover:text-white transition"><FaTwitter size={18} /></a>
            </div>
          </div>
        </div>

        {/* PARTE FINAL */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <div className="text-xl font-bold text-white tracking-widest italic">SINFAGEST</div>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition">FAQ</Link>
            <Link href="#" className="hover:text-white transition">Centro de Suporte</Link>
            <Link href="#" className="hover:text-white transition">Termos & Privacidade</Link>
          </div>
        </div>

      </div>

      {/* WHATSAPP FLUTUANTE */}
      <div className="fixed bottom-6 right-6">
        <a
          href={`https://wa.me/${numeroWhatsApp}`}
          target="_blank"
          className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
        >
          <MessageCircle size={28} />
        </a>
      </div>

    </footer> 
    </>
  )
}
