"use client";

import React from "react";
import Image from "next/image";
import { Download, Palette } from "lucide-react";
import { useForm, FieldValues, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import DialogbuyServicesCompoent from "@/components/Dialog.component/Dialog.buyServices.component";

/* ------------------------------------------------------------------ */
/* COMPONENTE INTERNO (SEM EXPORT)                                     */
/* ------------------------------------------------------------------ */
const Form = ({
  register,
}: {
  register: UseFormRegister<FieldValues>;
}) => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>Nome do produto</Label>
          <Input {...register("name")} placeholder="Nome do produto" />
        </div>
      </section>
    </main>
  );
};

/* ------------------------------------------------------------------ */
/* PAGE                                                               */
/* ------------------------------------------------------------------ */
export default function DesignPage() {
  const { register, handleSubmit, reset } = useForm();

  const handleSaveUser = async (data: any) => {
    console.log(data);
    reset();
  };

  return (
    <main className="bg-white w-screen flex flex-col gap-3">
      {/* HERO */}
      <section
        className="relative w-full overflow-hidden pt-4"
        style={{
          background:
            "linear-gradient(135deg, var(--cor-primaria) 0%, var(--cor-primaria-claro) 100%)",
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-white">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Palette size={16} />
              <span>Design</span>
            </div>

            <h1 className="text-2xl font-semibold">Design Gráfico</h1>

            <p className="text-lg text-gray-100">
              Estabelecer o SINFA como parceiro estratégico de design para
              empresas, oferecendo soluções visuais consistentes e gestão
              profissional de presença digital.
            </p>
          </div>
        </div>

        <div className="absolute inset-0 bg-[url('/images/linhas.png')] bg-cover opacity-40"></div>
      </section>

      {/* SERVIÇOS */}
      <section className="p-10 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-10">Nossos Serviços</h1>

        <div className="flex flex-col md:flex-row gap-6 border rounded-2xl p-4 shadow-md hover:shadow-xl transition">
          <Image
            src="/images/img1.jpg"
            width={200}
            height={200}
            alt="Design"
            className="rounded-md"
          />

          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-bold">Identidade Visual</h3>
            <ul className="grid md:grid-cols-3 gap-4">
              {[
                "Criação ou renovação de logotipo",
                "Paleta de cores e tipografia",
                "Manual de marca",
                "Mockups institucionais",
                "Arquivos finais profissionais",
              ].map((item, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <span className="font-bold text-orange-500">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* PREÇOS */}
      <section className="max-w-7xl mx-auto px-10 pt-20">
        <h1 className="text-4xl font-bold text-center mb-10">Preços</h1>

        <div className="grid md:grid-cols-2 gap-10">
          <div className="border rounded-md p-6 text-center">
            <h2 className="text-xl font-semibold">Identidade Visual</h2>
            <p className="mt-4 font-bold text-orange-500">
              50.000 AOA – 150.000 AOA
            </p>
          </div>

          <div className="border rounded-md p-6 text-center">
            <h2 className="text-xl font-semibold">
              Gestão de Redes Sociais
            </h2>
            <p className="mt-4 font-bold text-orange-500">
              120.000 AOA – 300.000 AOA
            </p>
          </div>
        </div>
      </section>

      {/* PORTFÓLIO */}
      <section className="max-w-7xl mx-auto px-10 pt-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Baixe o nosso Portfólio Comercial
        </h1>

        <p className="mb-8">
          Conheça em detalhe os nossos serviços e projetos.
        </p>

        <a href="/portfolio-comercial.pdf" download>
          <Button className="p-6 bg-black text-white text-xl">
            <Download className="mr-2" /> Baixar PDF
          </Button>
        </a>
      </section>

      {/* MODAL COMPRA */}
      <section className="max-w-7xl mx-auto px-10 py-20 flex justify-center">
        <DialogbuyServicesCompoent
          title="Comprar serviços"
          titleButton="Comprar serviço"
          description="Adiciona os dados corretos para comprar serviços"
          handleSubmit={handleSubmit}
          register={register}
          save={handleSaveUser}
          classname="p-6 bg-black text-white text-xl"
        >
          <Form register={register} />
        </DialogbuyServicesCompoent>
      </section>
    </main>
  );
}