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
      <div className="flex flex-col gap-1">
        <Label>{Selected ? "Novo nome da sub-categoria" : "Nome da sub-categoria"}</Label>
        <Input
          defaultValue={Selected ? Selected?.name : ""}
          {...register("name")}
          placeholder="Nome da sub-categoria"
        />
      </div>
      
        <div className="flex w-full flex-col gap-2 mt-2">
          <Label>Categoria</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">Selecionar Categoria             </NativeSelectOption>
            <NativeSelectOption value="Active">Activo</NativeSelectOption>
            <NativeSelectOption value="Inactive">Inativo</NativeSelectOption>
          </NativeSelect>
        </div>
    </main>
  );
};
