"use client"

import { TrendingUp, Users, Award, Zap } from "lucide-react"

export default function StatisticsSection() {
  const statistic = [
    {
      number: "10+",
      text: "Anos de Experiência",
      icon: Award,
    },
    {
      number: "500+",
      text: "Clientes Satisfeitos",
      icon: Users,
    },
    {
      number: "1000+",
      text: "Projetos Entregues",
      icon: TrendingUp,
    },
    {
      number: "98%",
      text: "Taxa de Satisfação",
      icon: Zap,
    },
  ]

  return (
    <section className="w-full py-10 bg-[#001d49] text-white lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistic.map((stat, index) => {
            const IconeStat = stat.icon
            return (
              <div key={index} className="text-center " style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center group hover:bg-secondary/20">
                    <IconeStat className="w-8 h-8 group-hover:scale-110" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-sm text-white font-medium">{stat.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
