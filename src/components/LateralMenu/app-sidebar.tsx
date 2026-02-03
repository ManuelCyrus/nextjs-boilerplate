"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  Users,
  UserCheck,
  Box,
  ShoppingCart,
  Layers,
  Settings,
  Lock,
  FileText,
  Building,
  UserCog,
  Monitor,
  FileChartColumnIncreasing,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { FaCashRegister, FaFileInvoice } from "react-icons/fa"
import LogotipoSinfa from "../assets/logotipo"

// This is sample data.

const data = {
  navMain: [
    {
      title: "Financeiro",
      url: "/manager/finance",
      icon: FileText,
    },
     {
      title: "Produtos",
      icon: ShoppingCart,
      items: [
        { title: "Produtos", url: "/Produtos", icon: Box },
        { title: "Serviço", url: "/Produtos/servicos", icon: Box },
        { title: "Categorias", url: "/Produtos/categoria", icon: Box },
        { title: "Movimentação de stock", url: "/Produtos/movimento-de-stock", icon: Box },
        { title: "Inventário", url: "/Produtos/inventario", icon: Box },
        { title: "Histórico inventario", url: "/Produtos/historico-inventario", icon: Box },
        { title: "Expirados", url: "/Produtos/expirados", icon: Box },
        { title: "Esgotados", url: "/Produtos/esgotados", icon: Box },
    ],
    },
    {
      title: "Farmácia",
      icon: FileChartColumnIncreasing,
      items: [
        { title: "Dashboard", url: "/", icon: PieChart },
        { title: "POS / Vendas", url: "/user/pos", icon: Box },
        { title: "Caixa", url: "/user/caixa", icon: FileText },
        { title: "Orçamento / Proforma", url: "/user/proforma", icon: FileText },
        { title: "Devoluções / Trocas", url: "/user/devolucoes", icon: FileText },
      ],
    },
    {
      title: "Gestão de Contas",
      icon: Users,
      items: [
        { title: "Usuários", url: "/user", icon: Users },
        { title: "Permissões", url: "/admin/logs", icon: UserCheck },
        { title: "Níveis de Acesso", url: "/admin/roles", icon: Layers },
      ],
    },
    {
      title: "Empresas",
      icon: Building,
      items: [
        { title: "Empresas", url: "/Empresa", icon: Box },
        { title: "Filiais", url: "/Empresa/Filiais", icon: Box },
      ],
    },
    {
      title: "Configurações",
      icon: Settings,
      items: [
        { title: "Gerais", url: "/manager/config/general", icon: Settings },
        { title: "Sistema", url: "/manager/config/system", icon: Settings },
        { title: "Segurança", url: "/manager/config/security", icon: Lock },
      ],
    },
    {
      title: "Relatórios",
      url: "/manager/reports",
      icon: FileText,
    },
    {
      title: "Configurações Gerais",
      url: "/configuracoes",
      icon: UserCog,
    },
  ],
};


export function SidebarManager({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  collapsible="icon" {...props}>
      <SidebarHeader className="w-full flex p-0 pl-4 z-1">
        <LogotipoSinfa/>
      </SidebarHeader>
      <SidebarContent >
        
       
      </SidebarContent>
      <SidebarFooter>
     
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
