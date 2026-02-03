import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react"

import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardAction,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { CardDashboard } from "../Cards/cardDashboard"
import { CreditCard, FileText, ReceiptText, UserPlus } from "lucide-react"

export function SectionCards() {
    return (
        <div className=" *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4  *:data-[slot=card]:shadow-sm lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">

                <CardDashboard
                footerDescription="Meta: R$ 50.000"
                title="Faturamento de Hoje"
                value="$1,250.00"
                icon={<ReceiptText size={34}  />}
                />
                 <CardDashboard
                footerDescription="Meta: R$ 50.000"
                title="Documentos de Hoje"
                value="1,234"
                 icon={<FileText size={34} />}
                />
                 <CardDashboard
                footerDescription="Meta: R$ 50.000"
                title="Novos Clientes no mês"
                value="45,678"
                 icon={<UserPlus size={34} />}
                />
                 <CardDashboard
                footerDescription="Meta: R$ 50.000"
                title="Pagamentos de hoje"
                value="4.5%"
                 icon={<CreditCard size={34}  />}
                />
        </div>
    )
}
