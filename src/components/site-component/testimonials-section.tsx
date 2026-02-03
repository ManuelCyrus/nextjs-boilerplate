"use client"

import { Star } from "lucide-react"

export default function TestimonialsSection() {
  const testemunhos = [
    {
      nome: "João Silva",
      cargo: "Diretor Geral, Pharma Solutions",
      texto:
        "A SINFA transformou completamente a gestão da nossa empresa. Os resultados foram visíveis desde o primeiro mês.",
      classificacao: 5,
    },
    {
      nome: "Maria Costa",
      cargo: "Proprietária, E-Commerce Plus",
      texto: "Profissionalismo excepcional e soluções que realmente funcionam. Recomendo a SINFA sem hesitação.",
      classificacao: 5,
    },
    {
      nome: "Pedro Oliveira",
      cargo: "CEO, Tech Ventures",
      texto: "A equipa da SINFA é altamente competente e dedicada. Ultrapassaram todas as nossas expectativas.",
      classificacao: 5,
    },
  ]

  return (
    <section className="w-full py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16 anima-entrada">
          <div className="inline-block badge-corporativo mb-4">Testemunhos</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">O Que Dizem Nossos Clientes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Histórias reais de sucesso de empresas que confiaram nos nossos serviços.
          </p>
        </div>

        {/* Grid de Testemunhos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testemunhos.map((testemunho, indice) => (
            <div
              key={indice}
              className="p-8 bg-gray-50  rounded-2xl border border-gray-100 hover:border-gray-200 anima-entrada sombra-elevada"
              style={{ animationDelay: `${indice * 0.1}s` }}
            >
              {/* Classificação */}
              <div className="flex gap-1 mb-4">
                {[...Array(testemunho.classificacao)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>

              {/* Citação */}
              <p className="text-foreground text-lg font-medium mb-6 italic">"{testemunho.texto}"</p>

              {/* Autor */}
              <div className="pt-6 border-t border-gray-200">
                <p className="font-bold text-primary">{testemunho.nome}</p>
                <p className="text-sm text-muted-foreground">{testemunho.cargo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
