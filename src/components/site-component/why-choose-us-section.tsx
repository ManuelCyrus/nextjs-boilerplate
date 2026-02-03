"use client"

import { CheckCircle, Star, Shield, Zap, Users, Award } from "lucide-react"

export default function WhyChooseUsSection() {
  const razoes = [
    {
      icone: Star,
      titulo: "Excelência Comprovada",
      descricao: "Mais de 10 anos de experiência e centenas de projetos bem-sucedidos.",
    },
    {
      icone: Shield,
      titulo: "Profissionalismo Total",
      descricao: "Equipa certificada e comprometida com os melhores padrões de qualidade.",
    },
    {
      icone: Zap,
      titulo: "Soluções Inovadoras",
      descricao: "Tecnologia de ponta e metodologias modernas em todos os projetos.",
    },
    {
      icone: Users,
      titulo: "Atendimento Dedicado",
      descricao: "Suporte personalizado e consultivo durante todo o processo.",
    },
    {
      icone: Award,
      titulo: "Resultados Mensuráveis",
      descricao: "ROI comprovado e métricas transparentes de sucesso.",
    },
    {
      icone: CheckCircle,
      titulo: "Transparência Garantida",
      descricao: "Comunicação clara e documentação completa em cada etapa.",
    },
  ]

  return (
    <section className="w-full py-20 lg:py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16 anima-entrada">
          <div className="inline-block badge-corporativo mb-4">Por que nos escolher</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">Nossos Diferenciais</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Razões pelas quais empresas confiam na SINFA para transformar seus negócios.
          </p>
        </div>

        {/* Grid de Razões */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {razoes.map((razao, indice) => {
            const IconeRazao = razao.icone
            return (
              <div
                key={indice}
                className="p-8 bg-whit border border-gray-200 rounded-2xl shadow-md hover:shadow-xl  anima-entrada sombra-elevada"
                style={{ animationDelay: `${(indice % 3) * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4 group hover:bg-secondary/20 transicao-suave">
                  <IconeRazao className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-primary mb-2">{razao.titulo}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{razao.descricao}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
