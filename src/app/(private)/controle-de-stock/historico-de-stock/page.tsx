"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Trash,
} from "lucide-react";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import DefaultTable from "@/components/Table";
import { UsersInterface, userStore } from "@/services/users.api";
import React, { useEffect, useState, ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { FilterInputs } from "@/features/filters";
import PaginationComponent from "@/components/Pagination";
import { NumberItemsPagination } from "@/utils/settings";
import PageModelComponent from "@/components/pageModelComponent";


export default function page() {
  const [load, setLoad] = useState<boolean>(true);

  const [reload, setReload] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UsersInterface | null>(null);
  const [typeForm, setTypeForm] = useState<"Edit" | "create">("create");

  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [valueSearch, setValueSearch] = useState<string>("");

  const ListFilter = FilterInputs([], valueSearch);

  //Pagination ----
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ListFilter.length / NumberItemsPagination);

  const currentItems = ListFilter.slice(
    (currentPage - 1) * NumberItemsPagination,
    currentPage * NumberItemsPagination
  );
  //----

  const handleSaveUser = async (data: any) => {
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleUpdateUser = async (data: any) => {
    !reload ? setReload(true) : setReload(false);
    reset();
  };
  const handleDeleteUser = async (data: any) => {
    !reload ? setReload(true) : setReload(false);
    reset();
  };

  useEffect(() => {
    if (![0, 0, 0].length) {
      try {
        setLoad(true);
      } catch (e) {
        setLoad(false);
      } finally {
        setLoad(false);
      }
    }
  }, [reload]);

  return (
    <>
      <PageModelComponent
        label="Historico de Stock"
        lateral_header={
          <>
            <Input
              placeholder="pesquise aqui"
              onChange={(e) => {
                setValueSearch(e.target.value);
              }}
              className="w-full bg-white"
            />
     
          </>
        }
      >
        {load ? (
          <></>
        ) : (
          // <main className="w-full rounded-md md:w-full bg-white absolute z-10 h-[20vh] flex items-center justify-center text-md font-semibold text-blue-400 gap-2">
          //   <LoaderCircle size={30} className="animate-spin text-2xl" /> A
          //   carregar ...
          // </main>
          <>
            {Array.isArray(currentItems) && currentItems.length > 0 ? (
              <></>
            ) : (
              <main className="w-full rounded-md md:w-full bg-white absolute z-10 h-[20vh] px-10 flex items-center justify-center text-md font-semibold text-red-600 gap-2">
                <AlertCircle /> Sem dados disponíveis
              </main>
            )}
          </>
        )}

        <DefaultTable
          headers={
            <>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Descrição</TableHead>
              <TableHead className="text-right">Preço</TableHead>

              <TableHead className="text-center">Opções</TableHead>
            </>
          }
        >
          {Array.isArray(currentItems) ? (
            []?.map((item, index) => (
              <TableBody key={index}>
                <TableRow
                  className={`border-gray-200 p-3 bg-${
                    index % 2 !== 0 ? "gray-100" : "white"
                  } hover:shadow-sm hover:shadow-gray-300 hover:border hover:border-gray-300 z-2 `}
                >
                  <TableCell className="font-medium">
                    {index.toString().slice(0, 6)}...
                  </TableCell>

                  <TableCell>{index}</TableCell>
                  <TableCell>{index}</TableCell>
                  <TableCell className={` text-right`}>
                    <Badge
                      className={`bg-white border ${
                        index.toString() == "ACTIVE"
                          ? "text-green-400 border-green-400"
                          : "text-red-400 border-red-400"
                      }`}
                    >
                      {index.toString() == "ACTIVE" ? "Activo" : "Inativo"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right gap-2">
                    <Button
                      onClick={() => handleDeleteUser("")}
                      className="p-2 rounded-sm"
                    >
                      <Trash size={10} />
                    </Button>
                 
                   
                  </TableCell>
                </TableRow>
              </TableBody>
            ))
          ) : (
            <></>
          )}
        </DefaultTable>

        <PaginationComponent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </PageModelComponent>
    </>
  );
}
