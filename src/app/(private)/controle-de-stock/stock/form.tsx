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
        <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Novo nome do stock" : "Nome do stock"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Nome do stock"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Nova descrição" : "Descrição"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Descrição"
          />
        </div>
      </section>

      <section className="flex gap-2">
        <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Nova localização" : "Localização"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Localização"
          />
        </div>

        <div className="flex flex-col gap-1 w-full">
          <Label>{Selected ? "Nova filial" : "Filial"}</Label>

          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar filial
            </NativeSelectOption>
            <NativeSelectOption value="Active">Activo</NativeSelectOption>
            <NativeSelectOption value="Inactive">Inativo</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>

      <div className="py-2">
        <Separator />
      </div>

      <section className="flex gap-2 flex-col">
        <div className="flex w-full gap-1 items-center">
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="checkbox"
            className="w-5"
            placeholder="telefone"
          />
          <Label>
            {Selected ? "Bloqueio de Entrada" : "Bloqueio de Entrada"}
          </Label>
        </div>

        <div className="flex w-full gap-1 items-center">
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="checkbox"
            className="w-5"
            placeholder="telefone"
          />
          <Label>{Selected ? "Bloqueio de saída" : "Bloqueio de saída"}</Label>
        </div>
      </section>
    </main>
  );
};
