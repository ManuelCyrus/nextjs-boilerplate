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
          <Label>{Selected ? "Novo nome do serviço" : "Nome do serviço"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Nome do serviço"
          />
        </div>
      </section>

      <section className="flex gap-2 mt-1">
        <div className="flex w-full flex-col gap-1">
          <Label>Categoria</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar categoria
            </NativeSelectOption>
            <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
            <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
            <NativeSelectOption value="Inactive">
              Simplificado
            </NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>Sub-Categoria</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar sub-categoria
            </NativeSelectOption>
            <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
            <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
            <NativeSelectOption value="Inactive">
              Simplificado
            </NativeSelectOption>
          </NativeSelect>
        </div>
      </section>

      <div className="py-4">
        <Separator />
      </div>

      <section className="flex gap-2 mt-1">
        <div className="flex w-full flex-col gap-1">
          <Label>Taxa de imposto</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar taxa de imposto
            </NativeSelectOption>
            <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
            <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
            <NativeSelectOption value="Inactive">
              Simplificado
            </NativeSelectOption>
          </NativeSelect>
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>Isenção</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">
              Selecionar Isenção
            </NativeSelectOption>
            <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
            <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
            <NativeSelectOption value="Inactive">
              Simplificado
            </NativeSelectOption>
          </NativeSelect>
        </div>
      </section>

      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>
            {Selected ? "Nova preço sem imposto" : "Preço sem imposto"}
          </Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("prc")}
            placeholder="Preço sem imposto"
          />
        </div>
        <div className="flex flex-col w-full gap-1">
          <Label>
            {Selected ? "Novo preço com imposto" : "Preço com imposto"}
          </Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("prcimp")}
            placeholder="Preço com imposto"
          />
        </div>
      </section>

      <div className="py-2">
        <Separator />
      </div>
      <section className="flex gap-2">
        <div className="flex w-full gap-1 items-center">
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="checkbox"
            className="w-5"
            placeholder="telefone"
          />
          <Label>{Selected ? "Retenção na fonte" : "Retenção na fonte"}</Label>
        </div>
      </section>

    </main>
  );
};
