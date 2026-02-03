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
        <Label>{Selected ? "Novo nome" : "Nome"}</Label>
        <Input
          defaultValue={Selected ? Selected?.name : ""}
          {...register("name")}
          placeholder="Nome do utilizador"
        />
      </div>
      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Novo Email" : "Email"}</Label>
          <Input
            defaultValue={Selected ?Selected?.email : ""}
            {...register("email")}
            type="email"
            placeholder="Email do utilizador"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>{Selected ? "Nova Senha" : "Senha"}</Label>
          <Input
            defaultValue={""}
            {...register("password")}
            type="password"
            placeholder="Senha do utilizador"
          />
        </div>
      </section>
      <section className="flex gap-2">
      
        <div className="flex flex-col gap-1 w-full">
          <Label>Estado</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">Activo</NativeSelectOption>
            <NativeSelectOption value="Inactive">Inativo</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>
    </main>
  );
};
