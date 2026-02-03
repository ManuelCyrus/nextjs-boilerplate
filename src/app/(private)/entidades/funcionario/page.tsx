"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blocks, Edit, Eye, PlusCircle, Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardTitle } from "@/components/ui/card";
import DialogCompoent from "@/components/Dialog.component/Dialog.component";
import DefaultTable from "@/components/Table";
import { UsersInterface, userStore } from "@/services/users.api";
import React, { useEffect, useState, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { RoleInterface, roleStore } from "@/services/role.api";
import { FilterInputs } from "@/features/filters";
import PaginationComponent from "@/components/Pagination";
import { NumberItemsPagination } from "@/utils/settings";
import Image from "next/image";
import DialogPerfilCompoent from "@/components/Dialog.component/Dialog.perfil.component";


const Form = ({ register, ListRole, userSelected }: { register: UseFormRegister<FieldValues>, ListRole: RoleInterface[], type?: "create" | "Edit", userSelected?: UsersInterface | null }) => {
  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label>{userSelected ? "Novo nome" : "Nome"}</Label>
        <Input
          defaultValue={userSelected ? userSelected?.name : ""}
          {...register("name")}
          placeholder="Nome do utilizador"
        />
      </div>
      <section className="flex gap-2">
        <div className="flex flex-col w-full gap-1">
          <Label>{userSelected ? "Novo Email" : "Email"}</Label>
          <Input defaultValue={userSelected ? userSelected?.email : ""}  {...register("email")} type="email" placeholder="Email do utilizador" />
        </div>
        <div className="flex w-full flex-col gap-1">
          <Label>{userSelected ? "Nova Senha" : "Senha"}</Label>
          <Input defaultValue={""}  {...register("password")} type="password" placeholder="Senha do utilizador" />
        </div>
      </section>
      <section className="flex gap-2">
        <div className="flex flex-col gap-1 w-full">
          <Label>{userSelected ? "Nova Função" : "Função"}</Label>
          <NativeSelect {...register("roleId")} className="w-full">
            {
              Array.isArray(ListRole) ? ListRole.map((item) => (
                <NativeSelectOption key={item._id} value={item._id}>{item.name}</NativeSelectOption>
              )) : "Sem dados Disponiveis"
            }
          </NativeSelect>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <Label>Estado</Label>
          <NativeSelect {...register("status")} className="w-full">
            <NativeSelectOption value="Active">Activo</NativeSelectOption>
            <NativeSelectOption value="Inactive">Inativo</NativeSelectOption>
          </NativeSelect>
        </div>
      </section>
    </main>
  )
}



export default function page() {

  const { GetAll, List, Create, Update, Delete } = userStore();
  const { GetAllRole, ListRole } = roleStore();
  const [reload, setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersInterface | null>(null);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");

  useEffect(() => {
    if (!List.length)
      GetAll();

    if (ListRole.length == 0)
      GetAllRole();

  }, [reload])

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [valueSearch, setValueSearch] = useState<string>("");

  const ListFilter = FilterInputs(List, valueSearch);

  //Pagination ----
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ListFilter.length / NumberItemsPagination);

  const currentItems = ListFilter.slice(
    (currentPage - 1) * NumberItemsPagination,
    currentPage * NumberItemsPagination
  );
  //----
  
  const handleSaveUser = async (data: any) => {
    Create(data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleUpdateUser = async (data: any) => {
    Update(selectedUser?._id as string, data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleDeleteUser = async (data: any) => {
    Delete(data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <div className="">
          <main className="flex-1 p-6 overflow-auto">
            <div className=" bg-white shadow p-2 rounded-md ">
              <div className="flex rounded-md items-center justify-between">
                <Label className="text-3xl font-bold ">Categorias de Produto</Label>

                <div className="flex gap-2 items-center w-[30%]">
                  <Input placeholder="pesquise aqui" 
                  onChange={(e)=>{
                    setValueSearch(e.target.value)
                  }}
                  className="w-full bg-white" />
                  <DialogCompoent
                    onClickButtonTrigger={() => {
                      setTypeForm("create") 
                      reset();
                    }}
                    handleSubmit={handleSubmit}
                    register={register}
                    icon={<PlusCircle />}
                    titleButton="Adicionar"
                    children={
                      <Form type={typeForm} register={register} ListRole={ListRole} />
                    }
                    save={handleSaveUser}
                    title="Utilizador"
                    description="Adicionar Utizador"
                  />

                </div>
              </div>
              <section></section>
            </div>

            <main className="bg-white w-full rounded-2xl px-8 mt-4 py-3 overflow-y-scroll max-h-[78vh]">
              <main className="relative ">
                <DefaultTable
                  headers={
                    <>  
                     <TableHead>Imagem</TableHead>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="text-right">Função</TableHead>
                      <TableHead className="text-right">Estado</TableHead>
                      <TableHead className="text-center">Opcoes</TableHead>
                    </>
                  }
                >
                  {
                    Array.isArray(currentItems) ?
                      currentItems?.map((item, index) => (

                        <TableBody key={item._id}>
                          <TableRow className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                           <TableCell className="p-2">    
                              <Image
                              alt="image"
                              src="/products/1.png"
                              width={50}
                              height={50}
                              className="rounded-md border border-gray-100"
                              />
                        </TableCell> 
                        <TableCell className="font-medium">{item._id.slice(0, 6)}...</TableCell>
                        
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell className="text-right">{item.role}</TableCell>
                            <TableCell className={` text-right`}>
                              <Badge className={`bg-white border ${item.status == "ACTIVE" ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}`}>{item.status == "ACTIVE" ? "Activo" : "Inativo"}</Badge>
                            </TableCell>
                            <TableCell className="text-right gap-2">
                              <Button onClick={() => handleDeleteUser(item._id)} className="p-2 rounded-sm">
                                <Trash size={10} />
                              </Button>
                              <DialogCompoent
                                handleSubmit={handleSubmit}
                                register={register}
                                trigger={
                                  (
                                    <Button onClick={() => {
                                      setTypeForm("Edit")
                                      reset();
                                      setSelectedUser(item)
                                    }} className="p-2 ml-2 rounded-sm">
                                      <Edit size={10} />
                                    </Button>
                                  )
                                }
                                children={
                                  <Form userSelected={item} type={typeForm} register={register} ListRole={ListRole} />
                                }
                                save={handleUpdateUser}
                                title="Utilizador"
                                description="Atualizar Utizador"
                              />

                               <DialogPerfilCompoent
                                trigger={
                                  (
                                    <Button onClick={() => {
                                      reset();
                                      setSelectedUser(item)
                                    }} className="p-2 ml-2 rounded-sm">
                                      <Eye size={10} />
                                    </Button>
                                  )
                                }
                                children={
                               <>
                                  <main className="flex gap-2 w-full justify-around">

                                  <section className="w-[50%] h-full border border-gray-100 rounded-md">
                                     <Image
                              alt="image"
                              src="/products/1.png"
                              width={250}
                              height={250}
                              className="w-full h-full rounded-md border border-gray-100"
                              />
                                  </section>
                                  <section className="w-[50%] px-4 flex flex-col gap-2">
                                   <p className="text-sm text-gray-400">Nome do produto:</p>
                                    <h1 className="text-xl font-bold">Parodontax – Creme Dental Anti-Sangramento</h1>
                                   <p className="text-sm text-gray-400">Descrição do produto:</p>
                                    <p className="text-sm ">Creme dental desenvolvido especialmente para auxiliar na prevenção do sangramento gengival. Sua fórmula ajuda a reduzir a placa bacteriana e fortalecer a saúde da gengiva, oferecendo sensação de limpeza profunda e frescor prolongado.</p>
                                   <p className="text-sm text-gray-400">Preço do produto:</p>
                                   
                                   <div className="border p-2 rounded-md flex items-center justify-between text-2xl">
                                    <p className="text-orange-400 font-bold ">20.000.00</p>
                                  <p>Kz</p>
                                   </div>
                                  </section>

                                  </main>
                               </>
                                }
                                title="Produto"
                                description=""
                              />

                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )) : (<main className="w-full p-10 flex items-center justify-center text-md font-semibold text-red-600">
                        <Blocks />  Sem dados disponíveis
                      </main>)
                  }
                </DefaultTable>

                  <PaginationComponent 
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                  />

              </main>
            </main>
          </main>
        </div>
      </div>
    </>
  );
}
