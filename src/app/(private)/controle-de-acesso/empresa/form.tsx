"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UsersInterface } from "@/services/users.api";
import React from "react";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { FieldValues, UseFormRegister } from "react-hook-form";
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
          <Label>{Selected ? "Novo nome da empresa" : "Nome da empresa"}</Label>
          <Input
            defaultValue={Selected ? Selected?.name : ""}
            {...register("name")}
            placeholder="Nome da empresa"
          />
        </div>
        <div className="flex  flex-col gap-1">
          <Label>{Selected ? "Novo nif" : "Nif"}</Label>
          <Input
            defaultValue={""}
            {...register("nif")}
            type="text"
            placeholder="Nif"
          />
        </div>
      </section>

      <section className="flex gap-2 mt-1">
        <div className="flex flex-col w-full gap-1">
          <Label>
            {Selected ? "Novo Indicador de factura" : "Indicador de factura"}
          </Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("facturaIndicador")}
            type="text"
            placeholder="Indicador de factura"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>
            {Selected ? "Novo número de registro" : "Número de registro"}
          </Label>
          <Input
            defaultValue={""}
            {...register("numregistro")}
            type="text"
            placeholder="Numero de registro"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>Regime de IVA</Label>
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

      <div className="py-4">
        <Separator />
      </div>

      <section className="flex gap-2">
        <div className="flex w-full flex-col gap-1">
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

        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Novo morada" : "Morada"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("morada")}
            type="text"
            placeholder="Morada"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>{Selected ? "Novo cidade" : "Cidade"}</Label>
          <Input
            defaultValue={""}
            {...register("cidade")}
            type="text"
            placeholder="Cidade"
          />
        </div>
      </section>

      <section className="flex gap-2 mt-1">
        <div className="flex flex-col w-full gap-1">
          <Label>{Selected ? "Novo número de casa" : "Número de casa"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("numrua")}
            type="text"
            placeholder="Número de casa"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>{Selected ? "Novo rua" : "Rua"}</Label>
          <Input
            defaultValue={""}
            {...register("rua")}
            type="text"
            placeholder="Rua"
          />
        </div>
      </section>

      <div className="py-4">
        <Separator />
      </div>
      <section className="flex gap-2">
        <div className="flex flex-col gap-1">
          <Label>{Selected ? "Novo telefone" : "Telefone"}</Label>
          <Input
            defaultValue={Selected ? Selected?.email : ""}
            {...register("telefone")}
            type="number"
            placeholder="telefone"
          />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>{Selected ? "Novo Email" : "Email"}</Label>
          <Input
            defaultValue={""}
            {...register("email")}
            type="email"
            placeholder="Email"
          />
        </div>
      </section>

      <div className="flex flex-col w-full gap-1">
        <Label>{Selected ? "Novo web site" : "Web site"}</Label>
        <Input
          defaultValue={Selected ? Selected?.email : ""}
          {...register("website")}
          type="text"
          placeholder="web site"
        />
      </div>

    </main>
  );
};
