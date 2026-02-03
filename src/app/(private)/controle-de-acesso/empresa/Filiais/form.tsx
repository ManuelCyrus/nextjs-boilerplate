"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UsersInterface } from "@/services/users.api";
import React from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { Separator } from "@/components/ui/separator";

export const Form = ({
  register,
  Selected,
}: {
  register: UseFormRegister<FieldValues>;
  type?: "create" | "Edit";
  Selected?: UsersInterface | null;
}) => {
  return (
    <main className="flex flex-col gap-2">
      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Novo nome da filial" : "Nome da filial"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Nome da empresa"
          />
        </div>
         <div className="flex flex-col gap-1">
          <Label>Provincia</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar regime
            </NativeSelectOption>
            <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
            <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
            <NativeSelectOption value="Inactive">
              Simplificado
            </NativeSelectOption>
          </NativeSelect>
        </div>
      </section>

      <section className="flex gap-2 mt-1">
        <div className="flex flex-col gap-1">
          <Label>
            {Selected ? "Novo Identidade" : "Identidade"}
          </Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("identidade")}
            type="text"
            placeholder="Indentidade"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>
            {Selected ? "Novo endereço" : "Endereço"}
          </Label>
          <Input
            defaultValue={""}
            {...register("endereco")}
            type="text"
            placeholder="Endereço"
          />
        </div>
      </section>

      <div className="py-4">
        <Separator />
      </div>

      <section className="flex gap-2">
         <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Novo telefone" : "Telefone"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="number"
            placeholder="telefone"
          />
        </div>

             <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Novo telefone opcional" : "Telefone opcional"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="number"
            placeholder="telefone"
          />
        </div>

      </section>


      <section className="flex gap-2 mt-1">
        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Novo email" : "Email"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("numrua")}
            type="text"
            placeholder="Email"
          />
        </div>
      </section>

    </main>
  );
};
