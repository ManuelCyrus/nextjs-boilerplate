"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function FAQSection() {
  const [perguntaAberta, setPerguntaAberta] = useState<number | null>(0)

  const perguntas = [
    {
      pergunta: "Quanto tempo leva para ver resultados?",
      resposta:
        "O timeline varia conforme o projeto, mas geralmente começamos a entregar resultados mensuráveis dentro de 30-60 dias. Definimos marcos claros no início do projeto.",
    },
    {
      pergunta: "Qual é o processo de implementação?",
      resposta:
        "Começamos com uma consultoria estratégica, depois seguimos com planejamento detalhado, desenvolvimento/implementação, testes e treinamento. Mantemos comunicação constante.",
    },
    {
      pergunta: "Posso ter suporte após a implementação?",
      resposta:
        "Sim, oferecemos pacotes de suporte personalizados. Podemos fornecer manutenção, atualizações e consultoria contínua conforme necessário.",
    },
    {
      pergunta: "Como funciona o pagamento?",
      resposta:
        "Oferecemos opções flexíveis: pagamento integral, parcelado ou por etapas do projeto. Discutiremos o modelo mais adequado na primeira reunião.",
    },
    {
      pergunta: "Vocês trabalham com empresas de qualquer tamanho?",
      resposta:
        "Sim, temos experiência com startups, PME e grandes corporações. Escalamos nossas soluções para cada perfil de cliente.",
    },
  ]

  return (
    <section className="w-full py-20 lg:py-32 "
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-16 anima-entrada">
          <div className="inline-block badge-corporativo mb-4">Perguntas Frequentes</div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">FAQ - Dúvidas Comuns</h2>
          <p className="text-lg text-muted-foreground">
            Respostas para as perguntas mais frequentes dos nossos clientes.
          </p>
        </div>

        {/* Acordeão */}
        <div className="space-y-4">
          {perguntas.map((item, indice) => (
            <div
              key={indice}
              className="border border-gray-200 rounded-xl overflow-hidden anima-entrada"
              style={{ animationDelay: `${indice * 0.05}s` }}
            >
              <button
                onClick={() => setPerguntaAberta(perguntaAberta === indice ? null : indice)}
                className="w-full p-6 bg-white hover:bg-gray-50 flex items-center justify-between transicao-suave"
              >
                <span className="text-left font-bold text-foreground text-lg">{item.pergunta}</span>
                <ChevronDown
                  size={24}
                  className={`text-secondary flex-shrink-0 transicao-suave ${
                    perguntaAberta === indice ? "rotate-180" : ""
                  }`}
                />
              </button>
              {perguntaAberta === indice && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 anima-entrada">
                  <p className="text-muted-foreground leading-relaxed">{item.resposta}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
