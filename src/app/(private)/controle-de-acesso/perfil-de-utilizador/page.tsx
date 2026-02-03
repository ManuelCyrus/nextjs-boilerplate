
"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blocks, Edit, Eye, PlusCircle, ShieldCheck, Trash } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import DialogCompoent from "@/components/Dialog.component/Dialog.component";
import DefaultTable from "@/components/Table";
import { userStore } from "@/services/users.api";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { RoleInterface, roleStore } from "@/services/role.api";
import { useRouter } from "next/navigation";
import { CriptographRoute } from "@/utils/cripto";
import { FilterInputs } from "@/features/filters";
import PaginationComponent from "@/components/Pagination";
import { NumberItemsPagination } from "@/utils/settings";
import DialogTrashAlert from "@/components/Dialog.component/Dialog.TrashItem";
import { Checkbox } from "@/components/ui/checkbox";



const PERMISSIONS =[
    {
      area: "UTILIZADOR",
      actions: {
        view: true,
        create: true,
        edit: false,
        delete: false,
        export: true
      }
    },
    {
      area: "CARGOS",
      actions: {
        view: true,
        create: false,
        edit: false,
        delete: false,
        export: false
      }
    }
  ]


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
        <Input defaultValue={selected ? selected?.description : ""}  {...register("description")} placeholder="Descrição" />
      </div>

    </main>
  )
}

export default function Page() {

  const { GetAllRole, ListRole, CreateRole, DeleteRole, UpdateRole } = roleStore();
  const { getCompanyId } = userStore();
  const navigation = useRouter()
  const [reload, setReload] = useState(false);
  const [selectedRole, setSelectedRole] = useState<RoleInterface | null>(null);
  const [selectPermissions, setSeletPermissions] = useState<string[]>([]);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");




  useEffect(() => {

    if (ListRole.length == 0)
      GetAllRole();

  }, [reload])

  const [valueSearch, setValueSearch] = useState<string>("");

  const ListFilter = FilterInputs(ListRole, valueSearch);

  //Pagination ----
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ListFilter.length / NumberItemsPagination);

  const currentItems = ListFilter.slice(
    (currentPage - 1) * NumberItemsPagination,
    currentPage * NumberItemsPagination
  );
  //----

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: any) => {
    CreateRole(data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleUpdate = async (data: any) => {
    UpdateRole(selectedRole?._id as string, data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleDelete = async (data: any) => {
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
                <Label className="text-3xl font-bold ">Níveis de acesso</Label>

                <div className="flex gap-2 items-center w-[30%]">
                  <Input placeholder="pesquise aqui"
                    onChange={(e) => {
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
                    save={handleSave}
                    title="Nível de acesso"
                    description="Adicionar nível de acesso"
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
                      <TableHead>Nome</TableHead>
                      <TableHead>Descrição</TableHead>
                      <TableHead className="text-center">Opcoes</TableHead>
                    </>
                  }
                >
                  {
                    Array.isArray(currentItems) ?
                      currentItems?.map((item, index) => (

                        <TableBody key={item._id}>
                          <TableRow className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                          
                            <TableCell>{item.name.split("-")[0]}</TableCell>
                            <TableCell>{item.description}</TableCell>

                            <TableCell className="text-right gap-2">
                              <DialogTrashAlert
                                trigger={
                                  <Button className="p-2 rounded-sm">
                                    <Trash size={10} />
                                  </Button>
                                }
                                save={() => handleDelete(item._id)}
                              />
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
                                save={handleUpdate}
                                title="Nível de acesso"
                                description="Atualizar nível de acesso"
                              />

                <DialogCompoent
                                handleSubmit={handleSubmit}
                                register={register}
                                trigger={
                                  (
                                       <Button className="p-2 ml-2 rounded-sm">
                                <ShieldCheck size={10} />
                              </Button>
                                  )
                                }
                                children={
                                  <>
                                  {
                                    PERMISSIONS.map((item)=>(
                                      <div>
                                        {item.area}
                                        <div className="border rounded-md border-gray-200">
                                          <div className="flex px-2 justify-between items-center">
                                            <p>Ver</p>  <Checkbox defaultChecked={item.actions.view}/> 
                                          </div>
                                            <div className="flex px-2 bg-gray-200 justify-between items-center">
                                            <p>Criar</p>  <Checkbox className="bg-white" defaultChecked={item.actions.create}/> 
                                          </div>
                                            <div className="flex px-2 justify-between items-center">
                                            <p>Editar</p>  <Checkbox defaultChecked={item.actions.edit}/> 
                                          </div>
                                            <div className="flex px-2 bg-gray-200 justify-between items-center">
                                            <p>Deletar</p>  <Checkbox className="bg-white" defaultChecked={item.actions.delete}/> 
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                  }
                                  </>
                                }
                                save={handleUpdate}
                                title="Permissões"
                                description="Adicionar permissões"
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




