
import { ReactNode, useState } from "react";
import Header from "../Header";
import { usePathname, useRouter } from "next/navigation";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BanknoteIcon,
  Box,
  File,
  Home,
  Info,
  PiggyBankIcon,
  Settings,
  Variable,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import LinkLateralMenu from "../buttons/linkLateralMenu";
import ButtonDropDownLateralMenu from "../buttons/buttonDropDownLateralMenu";
import LogotipoSinfa from "../assets/logotipo";
import HeaderComponent from "../Header";

export default function LateralMenuGeneral({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const navigation = useRouter();


  const COLORS = "blue-900"
  const SUBCOLORS = "blue-950"


  const [pageSelected, setPageSelected] = useState<
    "1" | "2" | "3" | "4" | "5" | "6" | "7"
  >(
    pathname == "/"
      ? "1"
      : pathname.includes("/controle-de-stock")
        ? "3"
        : pathname.includes("/controle-de-artigo")
          ? "4"
          : pathname.includes("/utilizadores") ||
              pathname.includes("/logs") ||
              pathname.includes("perfil-de-utilizador")
            ? "5"
            : pathname.includes("/controle-de-acesso")
              ? "2"
              : pathname == "/configuracoes"
                ? "6"
                : pathname == "/controle-de-venda/pos"
                  ? "7"
                  : "1",
  );

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const nav = useRouter();

  return (
    <main className="flex w-full h-full">
      <aside className={`w-[300px] bg-${COLORS} text-white flex flex-col gap-2 items-end`}>
        <div className={`w-full bg-${SUBCOLORS} l-4 flex p-2`}>
          <LogotipoSinfa />
        </div>
        <section className="w-full pl-2 flex flex-col gap-2 overflow-x-scroll">
          <Tabs defaultChecked={true} defaultValue={pageSelected}>
            <TabsList
              defaultValue={"1"}
              className={`w-full relative h-full bg-${COLORS} text-sm flex flex-col gap-1 items-center justify-between`}
            >
              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="1"
                onClick={() => {
                  setPageSelected("1");
                  navigation.push("/");
                }}
              >
                <li className="flex gap-2 hover:text-blue-700 hover:bg-white cursor-pointer w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <Home />
                  <p className="">inicio</p>
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="7"
                onClick={() => {
                  setPageSelected("7");
                  navigation.push("/controle-de-venda/pos");
                }}
              >
                <li className="flex gap-2 hover:text-blue-700 hover:bg-white cursor-pointer w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <Box />
                  <p className="">POS</p>
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="2"
                onClick={() => {
                  setPageSelected("2");
                }}
              >
                <li className="flex flex-col gap-2 hover:text-blue-700 hover:bg-white cursor-pointer  w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <ButtonDropDownLateralMenu
                    click={() => toggleMenu("empresa")}
                  >
                    <i className="fas fa-user-shield w-5"></i>
                    Empresa
                    <i
                      className={`fas fa-chevron-${
                        openMenu === "empresa" ? "up" : "down"
                      } ml-auto`}
                    ></i>
                  </ButtonDropDownLateralMenu>

                  {openMenu === "empresa" && (
                    <ul className="ml-1 mt-1 w-full space-y-2">
                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-acesso/empresa");
                        }}
                      >
                       <i className="fas fa-file-invoice-dollar text-indigo-500 w-5"></i>{" "}
                        Empresa
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-acesso/empresa/Filiais");
                        }}
                      >
                       <i className="fas fa-list text-indigo-400 w-4"></i> {" "}
                        Filiais
                      </LinkLateralMenu>
                    </ul>
                  )}
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="4"
                onClick={() => {
                  setPageSelected("4");
                }}
              >
                <li className="flex flex-col gap-2 hover:text-blue-700 hover:bg-white cursor-pointer  w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <ButtonDropDownLateralMenu
                    click={() => toggleMenu("artigos")}
                  >
                    <i className="fas fa-user-shield w-5"></i>
                    Controle de artigos
                    <i
                      className={`fas fa-chevron-${
                        openMenu === "atigos" ? "up" : "down"
                      } ml-auto`}
                    ></i>
                  </ButtonDropDownLateralMenu>

                  {openMenu === "artigos" && (
                    <ul className="ml-1 rounded py-2 mt-1 w-full space-y-2">
                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-artigo/produto");
                        }}
                      >
                         <i className="fas fa-boxes text-indigo-500 w-5"></i> {" "}
                        Produtos
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-artigo/servico");
                        }}
                      >
                        <i className="fas fa-key text-indigo-400 w-4"></i>{" "}
                        Serviços
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-artigo/categoria");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Categorias
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-artigo/sub-categoria");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Sub-Categorias
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-artigo/unidade");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Unidades
                      </LinkLateralMenu>
                    </ul>
                  )}
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="3"
                onClick={() => {
                  setPageSelected("3");
                }}
              >
                <li className="flex flex-col gap-2 hover:text-blue-700 hover:bg-white cursor-pointer  w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <ButtonDropDownLateralMenu click={() => toggleMenu("stock")}>
                    <i className="fas fa-user-shield w-5"></i>
                    Controle de Stock
                    <i
                      className={`fas fa-chevron-${
                        openMenu === "stock" ? "up" : "down"
                      } ml-auto`}
                    ></i>
                  </ButtonDropDownLateralMenu>

                  {openMenu === "stock" && (
                    <ul className="ml-1 mt-1 w-full space-y-2">
                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-stock/stock");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Stock
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-stock/historico-de-stock");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Historico
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-stock/movimento-de-stock");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Movimento
                      </LinkLateralMenu>
                    </ul>
                  )}
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="5"
                onClick={() => {
                  setPageSelected("5");
                }}
              >
                <li className="flex flex-col gap-2 hover:text-blue-700 hover:bg-white cursor-pointer  w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <ButtonDropDownLateralMenu click={() => toggleMenu("contas")}>
                    <i className="fas fa-user-shield w-5"></i>
                    Controle de acesso
                    <i
                      className={`fas fa-chevron-${
                        openMenu === "contas" ? "up" : "down"
                      } ml-auto`}
                    ></i>
                  </ButtonDropDownLateralMenu>

                  {openMenu === "contas" && (
                    <ul className="ml-1 mt-1 w-full space-y-2">
                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-acesso/utilizadores");
                        }}
                      >
                        <i className="fas fa-users text-indigo-400 w-4"></i>{" "}
                        Usuários
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-acesso/perfil-de-utilizador");
                        }}
                      >
                        <i className="fas fa-key text-indigo-400 w-4"></i>{" "}
                        Permissões
                      </LinkLateralMenu>

                      <LinkLateralMenu
                        onClick={() => {
                          nav.push("/controle-de-acesso/logs");
                        }}
                      >
                        <i className="fas fa-history text-indigo-400 w-4"></i>{" "}
                        Atividades / Logs
                      </LinkLateralMenu>
                    </ul>
                  )}
                </li>
              </TabsTrigger>

              <TabsTrigger
                className=" w-full data-[state=active]:text-blue-600 data-[state=active]:bg-white data-[state=active]:rounded-[3px_0px_0px_3px]  shadow-none text-md"
                value="6"
                onClick={() => {
                  setPageSelected("6");
                  navigation.push("/configuracoes");
                }}
              >
                <li className="flex gap-2 hover:text-blue-700 hover:bg-white cursor-pointer w-full p-2 rounded-[3px_0px_0px_3px] items-center ">
                  <Settings />
                  <p className="">Configurações</p>
                </li>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </section>
      </aside>
      <main className="w-full overflow-hidden">
        <HeaderComponent />
        {children}
      </main>
    </main>
  );
}