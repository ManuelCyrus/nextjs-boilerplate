
"use client"
// pages/index.tsx
import Script from "next/script";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
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
import { useRouter } from "next/navigation";
import { CriptographRoute } from "@/utils/cripto";
import { api } from "@/lib/api";


const Form = ({ register, ListRole, selected }: { register: UseFormRegister<FieldValues>, ListRole: RoleInterface[], type?: "create" | "Edit", selected?: RoleInterface | null }) => {
  return (
    <main className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        <Label>{selected ? "Novo nome" : "Nome"}</Label>
        <Input
          defaultValue={selected ? selected?.name : ""}
          {...register("name")}
          placeholder="Nome"
        />

      </div>
      <div className="flex flex-col w-full gap-1">
        <Label>{selected ? "Nova descrição" : "Descrição"}</Label>
        <Input defaultValue={selected ? selected?.description : ""}  {...register("description")} type="email" placeholder="Email do utilizador" />
      </div>

    </main>
  )
}

export default function Page() {

  const { GetAllRole, ListRole, CreateRole, DeleteRole, UpdateRole } = roleStore();
  const navigation = useRouter()
  const [reload, setReload] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleInterface | null>(null);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");

  useEffect(() => {

    // if (ListRole.length == 0)
    //   GetAllRole();

    // async function onLoad() {
    //   const response = await api.get("/permissions");
    //     console.log(response)
    //     console.log("response")
    // }
    // onLoad();

  }, [reload])

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveUser = async (data: any) => {
    CreateRole(data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleUpdateUser = async (data: any) => {
    UpdateRole(selectedRole?._id as string, data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleDeleteUser = async (data: any) => {
    DeleteRole(data);
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
                <div className="flex gap-2 ">
                   <Button onClick={()=>{
                    navigation.push('/admin/roles')
                   }}>voltar</Button>
                <Label className="text-3xl font-bold ">Permições</Label>
                </div>

                <div className="flex gap-2 items-center w-[30%]">
                  <Input placeholder="pesquise aqui" className="w-full bg-white" />
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
                    title="Permições"
                    description="Adicionar permições"
                  />

                </div>
              </div>
              <section>

              </section>
            </div>

            <main className="bg-white w-full rounded-2xl px-8 mt-4 py-3 overflow-y-scroll max-h-[78vh]">
              <main className="relative ">
                <DefaultTable
                  headers={
                    <>
                      <TableHead className="w-[100px]">ID</TableHead>
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-center">Opcoes</TableHead>
                    </>
                  }
                >
                  {
                    Array.isArray(ListRole) ?
                      ListRole?.map((item, index) => (

                        <TableBody key={item._id}>
                          <TableRow className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                            <TableCell className="font-medium">{item._id.slice(0, 6)}...</TableCell>

                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.description}</TableCell>

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
                                      setSelectedRole(item)
                                    }} className="p-2 ml-2 rounded-sm">
                                      <Edit size={10} />
                                    </Button>
                                  )
                                }
                                children={
                                  <Form selected={item} type={typeForm} register={register} ListRole={ListRole} />
                                }
                                save={handleUpdateUser}
                                title="Permições"
                                description="Atualizar permições"
                              />
                              <Button onClick={() => {
                                navigation.push("/admin/roles/permitions/" + CriptographRoute(item._id))
                              }} className="p-2 ml-2 rounded-sm">
                                <Eye size={10} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      )) : (<main className="w-full p-10 flex items-center justify-center text-md font-semibold text-red-600">
                        <Blocks />  Sem dados disponíveis
                      </main>)
                  }
                </DefaultTable>
              </main>
            </main>
          </main>
        </div>
      </div>
    </>
  );
}




