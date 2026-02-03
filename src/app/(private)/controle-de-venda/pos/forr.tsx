"use client"

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Blocks, CheckCheckIcon, CheckCircle2, Edit, Eye, Plus, PlusCircle, Search, Trash, XCircle } from "lucide-react";
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

export default function Home() {

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
      <div className="flex border  w-screen h-screen bg-gray-100 text-gray-800 font-sans">
       <section className="w-full h-[100%] border-r">
<div className="w-full h-[50px] border-b bg-white p-2 flex gap-2">
       <div className="flex items-center"><p className="font-bold">Categorias</p></div>
        <Input placeholder="Pesquisar Categoria"/>
        <Button><Search/></Button>
       </div>
        <main className="border-b flex flex-col flex-wrap w-full p-0 m-0 gap-0 overflow-y-scroll h-[15vh]">
       
        {ListFilter.map((item, index) => (
          <div key={index} className="flex items-center justify-between h-[60px]  flex-[1_0_25%] w-[300px] max-w-[25%] p-2">
             <div
            className={`border cursor-pointer hover:bg-white hover:border-green-300 border-2 cursor-pointer h-full  flex  justify-between rounded-md`}
          >
            <div className=" p-2 h-full w-full border-r flex itens-center justify-center">
<p className="font-bold text-sm">{item.name}</p>
            </div>
            <div className="p-2 h-full w-[100px] flex itens-center justify-center">
              <p className="text-gray-900 text-sm">{index} itens</p>
            </div>
            
          </div>
          </div>
        ))}
      </main>
      <div className="w-full h-[61vh] overflow-hidden">
 <div className="flex items-center justify-between p-2 border-b w-full">
  
  <div className="flex items-center ">
  <p className="font-bold">Lista de Produtos</p>
  </div>
   <div className="flex items-center gap3">
  <p >Quantidade de produtos:</p>
  <p className="font-bold">120</p>
  </div>
  </div>
           <main className="overflow-y-scroll h-[55vh] flex flex-wrap w-full p-0 m-0 gap-0 ">
        {ListFilter.map((item, index) => (
          <div key={index} className="flex flex-col justify-between h-[180px]  flex-[1_0_25%] max-w-[25%] p-2">
             <div
            key={index}
            className={`hover:bg-white border ${index%2==0?"border-md border-green-500":""}  hover:shadow-xl hover:border-gray-400 cursor-pointer h-full p-0 flex flex-row justify-between items-center rounded-md`}
          >
            <div className="flex  p-4 justify-between flex-col h-full">
               <div>
               <p className="font-bold text-md">{item.name}</p>
               <p className="text-sm text-gray-400">12.000,00 kz</p>
            </div>
           <div className={`flex gap-2 items-center text-green-500`}>
            <CheckCircle2 className={`${index%2==0?"":"hidden"} `}/>
            <p className="text-gray-400 text-xs">a venda</p>
           </div>
            
            </div>
           <div className="py-2 flex gap-4 flex-col justify-between h-full px-4 border-l">
            <Button className="w-1 h-9">{"+"}</Button>
            <p className="text-2xl font-bold">14</p>
            <Button className="w-1 h-9">{"-"}</Button>
           </div>
          </div>
          </div>
         
        ))}
      </main> </div>
<div className="w-full h-[50px] border-b bg-white p-2 flex gap-2">
        <Input placeholder="Pesquisar Produto"/>
        <Button><Search/></Button>
       </div>

       </section>
       <section className="w-[40vh] h-[100%] border-l p-2">
 <aside className="w-full h-full">
              <div className="bg-white w-full border-gray-200 border-l h-full p-3">

                <div className="flex items-center justify-between mb-2">
                  <div className="text-lg font-semibold">Carrinho</div>
                  <div className="text-xs text-gray-500">Teclas: <span className="font-medium">F3</span> fechar</div>
                </div>

      <div className="w-full h-[50px]  bg-white py-2 flex gap-2">
          <Input placeholder="Pesquisar produto do carrinho"/>
              <Button><Search/></Button>
            </div>

                <div className=" overflow-hidden w-full h-full">

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
                          ListFilter?.map((invoice, index) => (

                            <TableBody key={index}>
                              <TableRow key={index} className={`border-gray-200 p-3 bg-${index % 2 !== 0 ? "gray-100" : "white"} hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}>
                                <TableCell className="font-medium">arroz</TableCell>
                                <TableCell>{invoice.name}</TableCell>
                                <TableCell className="text-right">12</TableCell>
                                <TableCell className="text-right gap-2">
                                  <Button className=" w-[12px] h-[16px] rounded-sm bg-red-400">
                                    <Trash size={10} />
                                  </Button>
                                  <Button className="w-[12px] h-[16px] left-2 rounded-sm bg-green-400">
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

                  <div className="mt-1 pt-3">
                    <div className="flex justify-between text-gray-600">
                      <div>SubTotal</div>
                      <div className="font-semibold">Kz 0,00</div>
                    </div>
                    <div className="flex justify-between text-gray-600 mt-1">
                      <div>Desconto</div>
                      <div className="font-semibold">Kz 0,00</div>
                    </div>
                    <div className="flex justify-between items-center mt-3">
                      {/* <input id="discountInput" type="number" min="0" max="100" value="0" className="w-24 border rounded px-2 py-1"/> */}
                      <div className="text-right w-full bg-gray-50 rounded p-1">
                        <div className="text-xs text-gray-500">Total</div>
                        <div className="text-2xl font-bold text-green-600">Kz 0,00</div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-2">
                      <select id="paymentMethod" className="border border-zinc-200 rounded px-3 py-2">
                        <option>Dinheiro</option>
                        <option>TPA</option>
                        <option>Transferência</option>
                      </select>
                      <div className="flex gap-2">

                        <Button id="finalizeBtn" className=" bg-green-600 text-white py-2 rounded hover:bg-green-700 w-[65%]">Finalizar (F9)</Button>
                        <Button id="previewInvoiceBtn" className=" bg-indigo-500 text-white py-2 rounded hover:bg-indigo-600"><Eye /></Button>
                        <Button id="cancelBtn" className="bg-red-600 text-white py-2 rounded hover:bg-red-700"><XCircle /></Button>

                      </div>
                    </div>

                    {/* <!-- quick actions --> */}
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <div className="text-sm text-gray-600 mb-2">Ações rápidas</div>
                      <div className="grid grid-cols-2 gap-2">
                        <button id="btnPrint" className="px-3 py-2 border rounded text-sm hover:bg-gray-50"><i className="fas fa-print mr-2"></i> Imprimir</button>
                        <button id="btnSave" className="px-3 py-2 border rounded text-sm hover:bg-gray-50"><i className="fas fa-save mr-2"></i> Salvar</button>
                        <button id="btnCustomerModal" className="px-3 py-2 border rounded text-sm hover:bg-gray-50"><i className="fas fa-user-plus mr-2"></i> Novo cliente</button>
                        <button id="btnOpenDrawer" className="px-3 py-2 border rounded text-sm hover:bg-gray-50"><i className="fas fa-cash-register mr-2"></i> Abrir caixa</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </aside>
       </section>
      </div>
    </>
  );
}
