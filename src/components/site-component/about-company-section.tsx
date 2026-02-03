"use client"

import Image from "next/image"
import { CheckCircle2, Target, Lightbulb } from "lucide-react"

export default function AboutCompanySection() {
  
  const diferenciais = [
    "Experiência de mais de 10 anos no mercado",
    "Equipa especializada e certificada",
    "Soluções personalizadas para cada cliente",
    "Atendimento profissional e dedicado",
    "Tecnologia de ponta e inovação constante",
    "Resultados comprovados e mensuráveis",
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

  return (
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
            <div className="space-y-4">
              <div className="inline-block badge-corporativo">Sobre a Empresa</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
                Conheça a <span className="text-secondary">SINFA</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A SFINFA é uma empresa de consultoria multidisciplinar dedicada a fortalecer e estruturar negócios
                através de soluções inovadoras e integradas.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Nosso lema "Gerir para Inovar - Inovar para Crescer" reflete nosso compromisso com a excelência e o
                desenvolvimento sustentável dos nossos clientes.
              </p>
            </div>

            {/* Lista de Diferenciais */}
            <div className="space-y-3">
              {diferenciais.map((diferencial, indice) => (
                <div
                  key={indice}
                  className="flex items-start gap-3 anima-entrada"
                  style={{ animationDelay: `${indice * 0.05}s` }}
                >
                  <CheckCircle2 className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{diferencial}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button className="btn-primario inline-block">Saiba Mais Sobre Nós</button>
          </div>
        </div>

        {/* Pilares da Empresa */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-20 border-t border-gray-200">
          {pilares.map((pilar, indice) => {
            const IconePilar = pilar.icone
            return (
              <div
                key={indice}
                className="p-8 bg-gray-50 rounded-2xl border border-gray-200 sombra-elevada anima-entrada"
                style={{ animationDelay: `${indice * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <IconePilar className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-3">{pilar.titulo}</h3>
                <p className="text-muted-foreground leading-relaxed">{pilar.descricao}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
