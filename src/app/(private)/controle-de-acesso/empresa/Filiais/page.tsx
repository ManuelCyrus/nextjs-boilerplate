
"use client"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blocks, Edit, Eye, PlusCircle, Trash } from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table"
import DialogCompoent from "@/components/Dialog.component/Dialog.component";
import DefaultTable from "@/components/Table";
import React, { useEffect, useState, ReactNode } from "react";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { FieldValues, useForm, UseFormRegister } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CriptographRoute } from "@/utils/cripto";
import { FilterInputs } from "@/features/filters";
import PaginationComponent from "@/components/Pagination";
import { NumberItemsPagination } from "@/utils/settings";
import DialogTrashAlert from "@/components/Dialog.component/Dialog.TrashItem";
import { BranchInterface, branchStore } from "@/services/branch.api";
import { Badge } from "@/components/ui/badge";
import { userStore } from "@/services/users.api";
import { Form } from "./form";


export default function Page() {

  const { CreateBranch,UpdateBranch,DeleteBranch,GetBranch,GetAllBranch,ListBranch } = branchStore();
  const { getCompanyId } = userStore();
  const navigation = useRouter()
  const [reload, setReload] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchInterface | null>(null);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");

  useEffect(() => {

    if (ListBranch.length == 0)
       GetAllBranch();

  }, [reload])

  const [valueSearch, setValueSearch] = useState<string>("");

  const ListFilter = FilterInputs(ListBranch, valueSearch);

  //Pagination ----
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ListFilter.length / NumberItemsPagination);

  const currentItems:BranchInterface[] = ListFilter.slice(
    (currentPage - 1) * NumberItemsPagination,
    currentPage * NumberItemsPagination
  );
  //----

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSave = async (data: any) => {
    data['companyId'] = getCompanyId;
    CreateBranch(data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  
  const handleUpdate = async (data: any) => {
    data['companyId'] = getCompanyId;
    UpdateBranch( selectedBranch?._id as string, data);
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleDelete = async (data: any) => {
    DeleteBranch(data);
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
                <Label className="text-3xl font-bold ">Filiais </Label>

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
                      <Form type={typeForm} register={register} />
                    }
                    save={handleSave}
                    title="Filial"
                    description="Adicionar filial"
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
                      <TableHead>Email</TableHead>
                      <TableHead>pais</TableHead>
                      <TableHead>Telefone</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-center">Opcoes</TableHead>
                    </>
                  }
                >
                  {
                    Array.isArray(currentItems) ?
                      currentItems?.map((item, index) => (

                        <TableBody key={item._id}>
                          <TableRow className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                            <TableCell className="font-medium">{item._id.slice(0, 6)}...</TableCell>
                            <TableCell>{item.name}</TableCell>
                            <TableCell>{item.email}</TableCell>
                            <TableCell>{item.country}</TableCell>
                            <TableCell>{item.phone}</TableCell>
                            <TableCell className={` text-right`}>
                              <Badge className={`bg-white border ${item.status == "ACTIVE" ? "text-green-400 border-green-400" : "text-red-400 border-red-400"}`}>{item.status == "ACTIVE" ? "Activo" : "Inativo"}</Badge>
                            </TableCell>

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
                                      setSelectedBranch(item)
                                    }} className="p-2 ml-2 rounded-sm">
                                      <Edit size={10} />
                                    </Button>
                                  )
                                }
                                children={
                                   <Form type={typeForm} register={register} />
                                }
                                save={handleUpdate}
                                title="Filial"
                                description="Atualizar filial"
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




