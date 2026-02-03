
"use client"

import { Pill, Calculator, Zap, Globe, Code2, Palette, Headphones, Megaphone, MoreHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ServicesSection() {
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
  const navigation = useRouter();
  return (
    <section id="servicos" className="w-full py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-entrada">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold texto-primario mb-4">Nossos Serviços</h2>
          <p className="text-lg texto-cinza max-w-2xl mx-auto">
            Soluções completas e integradas para o sucesso do seu negócio. Da consultoria ao desenvolvimento de
            software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicos.map((servico, indice) => {
            const IconeServico = servico.icone
            return (
              <div
                key={indice}
                className="servico-card group cursor-pointer animate-entrada"
                style={{ animationDelay: `${(indice % 3) * 0.1}s` }}
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${servico.cor} flex items-center justify-center mb-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500`}
                >
                  <IconeServico className={`w-7 h-7 ${servico.corIcone}`} />
                </div>
                <h3 className="text-xl font-bold texto-primario mb-2 group-hover:texto-secundario transicao-suave">
                  {servico.titulo}
                </h3>
                <p className="texto-cinza text-sm leading-relaxed">{servico.descricao}</p>
                <div
                  className="mt-4 pt-4 border-t opacity-0 group-hover:opacity-100 transicao-suave"
                  style={{ borderTopColor: "var(--cor-cinza-200)" }}
                >
                  <a
                    onClick={()=>{
                      navigation.push(servico.link as string);
                    }}
                    className="font-semibold text-sm hover:underline"
                    style={{ color: "var(--cor-secundaria)" }}
                  >
                    Saber Mais →
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center animate-entrada">
          <p className="text-lg texto-cinza mb-6">Pronto para transformar o seu negócio?</p>
          <a>
            <button   onClick={()=>{
            navigation.push("https://api.whatsapp.com/send?phone=244975817186&text=sinfa")
         }} className="btn-secundario">Entre em contacto</button>
          </a>
        </div>
      </div>
    </section>
  )
}
