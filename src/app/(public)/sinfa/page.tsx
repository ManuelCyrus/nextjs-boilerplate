"use client";

import { useEffect, useState } from "react";

import HeroSection from "@/components/site-component/hero-section";
import StatisticsSection from "@/components/site-component/statistics-section";
import { useRouter } from "next/navigation";
import {
  Pill,
  Calculator,
  Zap,
  Globe,
  Code2,
  Palette,
  Headphones,
  Megaphone,
  MoreHorizontal,
} from "lucide-react";

const services = [
  {
    id:1,
    icone: Pill,
    titulo: "Consultoria Farmacêutica",
    descricao:
      "Orientação especializada para indústria e comércio farmacêutico com compliance regulatório.",
    cor: "bg-blue-50",
    corIcone: "text-blue-600",
    link: "/sinfa/consutoria-farmaceutica",
    img: "/services/consultoria.jpg",
  },
  {
    id:2,
    icone: Calculator,
    titulo: "Contabilidade e Auditoria",
    descricao:
      "Serviços contábeis completos e auditorias para garantir conformidade fiscal.",
    cor: "bg-green-50",
    corIcone: "text-green-600",
    link: "/sinfa/contablidade-autoria",
    img: "/services/contas.jpg",
  },
  {
    id:3,
    icone: Zap,
    titulo: "Software de Faturação",
    descricao:
      "Sistema robusto de faturação e gestão de vendas para seu negócio.",
    cor: "bg-yellow-50",
    corIcone: "text-yellow-600",
    link: "/sinfa/software-de-facturacao",
    img: "/services/software.jpg",
  },
  {
    id:4,
    icone: Code2,
    titulo: "Desenvolvimento de Software",
    descricao:
      "Aplicações personalizadas para otimizar seus processos de negócio.",
    cor: "bg-red-50",
    corIcone: "text-red-600",
    link: "/sinfa/desenvolvimento",
    img: "/services/dese.jpg",
  },
  {
    id:5,
    icone: Palette,
    titulo: "Design Gráfico",
    descricao:
      "Identidade visual única e materiais gráficos de alta qualidade.",
    cor: "bg-pink-50",
    corIcone: "text-pink-600",
    link: "/sinfa/Design",
    img: "/services/desing.jpg",
  },
  {
    id:6,
    icone: Megaphone,
    titulo: "Marketing e Publicidade",
    descricao:
      "Estratégias de marketing digital e campanhas publicitárias eficazes.",
    cor: "bg-orange-50",
    corIcone: "text-orange-600",
    link: "/sinfa/Marketing",
    img: "/services/mark.jpg",
  },
];

export default function HomePage() {
  const navigation = useRouter();

  return (
    <main className="relative w-full">
      <div className="w-full flex justify-end">
        <div className="fixed z-10 h-full  flex flex-col gap-2 items-end justify-end md:px-20 px-4 pb-40">
          <img
            onClick={() => {
              navigation.push(
                "https://api.whatsapp.com/send?phone=244975817186&text=sinfa",
              );
            }}
            alt="ww"
            src={"/whatsap.png"}
            className="w-[50px] cursor-pointer shadow-xl rounded-full"
          />

          <img
            onClick={() => {
              navigation.push("");
            }}
            alt="ww"
            src={"/icon/email.png"}
            className="w-[50px] cursor-pointer shadow-xl rounded-full"
          />
        </div>
      </div>

      <HeroSection />
      <StatisticsSection />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 p-20">
        <div className="max-w-7xl border-l-[5px] border-orange-600  mt-20 px-4 sm:px-6 lg:px-8 text-2xl font-bold">
          <h1>NOSSOS SERVIÇOS</h1>
          <p className="text-[18px] text-orange-600 font-light mt-2">
            Soluções completas e integradas para o sucesso do seu negócio.
            <br></br> Da consultoria ao desenvolvimento de software.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
          {services.map((service, idx) => {
            return (
              <div
                key={service.id}
                onClick={() => {
                  navigation.push(service.link);
                }}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-gray-200 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div
                  className="w-full h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${service.img})` }}
                ></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#001c46] group-hover:text-[#ef4d00] transition-colors">
                    {service.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-2">
                    {service.descricao}
                  </p>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <span className="text-[#ef4d00] font-semibold text-sm cursor-pointer hover:underline">
                      Saber Mais →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </main>
  );
}
