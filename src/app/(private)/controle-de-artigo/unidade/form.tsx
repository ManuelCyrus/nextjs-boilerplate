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
        <Label>{Selected ? "Nova unidade" : "Unidade"}</Label>
        <Input
          defaultValue={Selected ? Selected?.name : ""}
          {...register("name")}
          placeholder="Unidade"
        />
      </div>
      <section className="flex gap-2 mt-2">
        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Nova sigla" : "Sigla"}</Label>
          <Input
            defaultValue={Selected ?Selected?.email : ""}
            {...register("email")}
            type="text"
            placeholder="Sigla"
          />
        </div>

      </section>
 
    </main>
  );
};
