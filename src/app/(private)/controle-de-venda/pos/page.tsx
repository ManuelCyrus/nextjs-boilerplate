"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blocks, CheckCheckIcon, CheckCircle2, Edit, Eye, Plus, PlusCircle, SaveAll, Search, Trash, XCircle, XCircleIcon } from "lucide-react";
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
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

export default function Home() {

  const { GetAll, List, Create, Update, Delete } = userStore();
  const { GetAllRole, ListRole } = roleStore();
  const [reload, setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersInterface | null>(null);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");
  const nav = useRouter()
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
      <div className="p-4 w-full h-[100vh] flex items-center justify-center">

<section className="border-r w-[50%] border rounded-[10px_0px_0px_10px] p-3 h-full">
<div>
        <div className="flex w-full flex-col gap-1">
            <Label>Cliente</Label>
            <NativeSelect {...register("status")} className="w-full">
              <NativeSelectOption value="Active">
                Selecionar cliente 
              </NativeSelectOption>
              <NativeSelectOption value="Active">Exclusão</NativeSelectOption>
              <NativeSelectOption value="Inactive">Geral</NativeSelectOption>
              <NativeSelectOption value="Inactive">
                Simplificado
              </NativeSelectOption>
            </NativeSelect>
          </div>
</div>
<div className="py-2">
  <Separator/>
</div>

<div>
  <div className="flex w-full justify-between p-2">
  <p>Loja</p>
  <p className="font-bold ">1000.00 kz</p>

  </div>
  <div className="flex w-full justify-between p-2">
  <p>Recompensa</p>
   <p className="font-bold ">2500.00 kz</p>
  </div>

</div>

<main>

<div className="py-2">
  <Separator/>
</div>


 <section className="w-full ">
 <aside className="w-full h-full">
              <div className="bg-white w-full border-gray-200 h-full">

                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold">Carrinho</div>
                  <div className="text-xs text-gray-500">Teclas: <span className="font-medium">F3</span> fechar</div>
                </div>

      <div className="w-full  bg-white py-2 flex gap-2">
          <Input placeholder="Pesquisar produto do carrinho"/>
              <Button><Search/></Button>
            </div>

                <div className="overflow-hidden w-full h-full">

                  <div className="w-full h-[40vh] border rounded-md border-gray-200  overflow-y-scroll">
                    <DefaultTable
                      headers={
                        <>
                          <TableHead className="w-[100px]">Produto</TableHead>
                          <TableHead>Qtd</TableHead>
                          <TableHead>Total</TableHead>
                          <TableHead className="text-center">Ação</TableHead>
                        </>
                      }
                    >
                      {
                        Array.isArray(ListFilter) ?
                          [0,0,0,0,0,0,0,0,0]?.map((invoice, index) => (

                            <TableBody key={index}>
                              <TableRow key={index} className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                                <TableCell className="font-medium">arroz</TableCell>
                                <TableCell>sssss</TableCell>
                                <TableCell className="text-right">12</TableCell>
                                <TableCell className="text-right flex gap-1">
                                  <Button className="rounded-sm bg-red-500">
                                    <Trash size={10} />
                                  </Button>
                                  <Button className="left-3 rounded-sm bg-green-500">
                                    <PlusCircle size={10} />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          )) : (<main className="w-full p-10 flex items-center justify-center text-md font-semibold text-red-600">
                            <Blocks />  Sem dados disponíveis
                          </main>)
                      }
                    </DefaultTable>
                  </div>

                  <div className="mt-1 pt-1">
                    <div className="flex justify-between text-gray-600">
                      <div>SubTotal</div>
                      <div className="font-semibold">Kz 0,00</div>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-1">
                      <div>Desconto</div>
                      <div className="font-semibold">Kz 0,00</div>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      {/* <input id="discountInput" type="number" min="0" max="100" value="0" className="w-24 border rounded px-2 py-1"/> */}
                      <div className="text-right w-full bg-gray-50 rounded p-1">
                        <div className="text-xs text-gray-500">Total</div>
                        <div className="text-2xl font-bold text-green-600">Kz 0,00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </aside>
       </section>

</main>

</section>
<section className="border-r w-full overflow-hidden border rounded-[0px_10px_10px_0px] h-full">
<header className="w-full border-b flex justify-end px-3">
   <div className="flex items-center gap-3">
         
          <div className="relative">
            <button id="userBtn" className="flex items-center gap-2 px-3 py-1 rounded hover:bg-gray-50">
              <div className="hidden sm:block text-sm text-right">
                <div className="font-medium text-md">Adalberto Jamba</div>
                <div className="text-xs  text-gray-500">administrador</div>
              </div> 
              <i className="fas fa-user-circle text-4xl text-gray-600"></i>
            </button>
          </div> 


          <button onClick={()=>{
            nav.push("/")
          }}  id="userBtn" className="flex items-center cursor-pointer bg-red-800 p-2 rounded hover:bg-red-900">
                <i className="fas fa-sign-out-alt text-1xl text-white"></i>
          </button>

        </div>
</header>

<main className="w-full flex h-[82vh] overflow-y-scroll">

<div className="w-[300px] border h-full p-1">
  <p className="font-semibold">Categorias:</p>
 <div className="w-full  bg-white py-1 flex gap-1">
          <Input placeholder="Pesquisar produto do carrinho"/>
              <Button><Search/></Button>
 </div>
<div className="py-2">
  <Separator/>
</div>

<main className="flex gap-1 h-[70vh] overflow-y-scroll flex-col">
    {
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((item)=>(
      <div key={item} className="hover:bg-black hover:text-white cursor-pointer border rounded px-1 text-sm py-2">
        Roupas
      </div>
    ))
  }
  
</main>

</div>


<div className="w-full">
  <header className="w-full px-2">
     <p className="font-semibold">Produtos:</p>
 <div className="w-full  bg-white py-1 flex gap-1">
          <Input placeholder="Pesquisar produto do carrinho"/>
              <Button><Search/></Button>
 </div>
<div className="py-2">
  <Separator/>
</div>
  </header>

 <main className="grid grid-cols-3 p-2 gap-1 h-[70vh] overflow-y-scroll flex-col">
    {
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((index,i)=>(
     <div key={i} className="flex flex-col justify-between p-2">
                <div
               key={index}
               className={`hover:bg-white border ${index%2==0?"border-md border":""}  hover:shadow-xl hover:border-gray-400 cursor-pointer h-full p-0 flex flex-col justify-between items-center rounded-md`}
             >
               <div className="flex  p-4 justify-between flex-col h-full">
                  <div>
                  <p className="font-bold text-md">Produto</p>
                  <p className="text-sm text-gray-400">12.000,00 kz</p>
               </div>
             
               
               </div>
              <div className="py-2 flex gap-2 justify-between h-full">
               <Button className="w-1 h-9">{"+"}</Button>
               <p className="text-2xl font-bold">14</p>
               <Button className="w-1 h-9">{"-"}</Button>
              </div>
             </div>
             </div>
    ))
  }
  
</main>
 

</div>



</main>

<footer className="w-full border p-1 flex items-center justify-rounded gap-2">
  
  <button className="flex text-white cursor-pointer bg-blue-700 border-blue-800 items-center gap-2 p-1 border rounded-md ">
    <PlusCircle size={18}/> Nova venda
  </button>
 <button className="flex text-white cursor-pointer bg-blue-700 border-blue-800 items-center  gap-2 p-1 border rounded-md ">
    <SaveAll size={18}/> Salvar venda
  </button>
 <button className="flex cursor-pointer bg-red-700 border-red-800 text-white items-center gap-2 p-1 border rounded-md ">
    <XCircleIcon size={18}/> Oferta
  </button>

 <button className="flex items-center gap-2 w-[40%] bg-green-700 border-green-800 cursor-pointer text-white p-1 border rounded-md ">
    <CheckCircle2 size={18}/> Pagar
  </button>
</footer>

</section>
      </div>
    </>
  );
}
