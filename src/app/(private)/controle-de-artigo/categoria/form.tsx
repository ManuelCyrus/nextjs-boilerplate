"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UsersInterface } from "@/services/users.api";
import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

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
        <Label>{Selected ? "Novo da categoria" : "Categoria"}</Label>
        <Input
          defaultValue={Selected ? Selected?.name : ""}
          {...register("name")}
          placeholder="Nome da categoria"
        />
      </div>

    </main>
  );
};
