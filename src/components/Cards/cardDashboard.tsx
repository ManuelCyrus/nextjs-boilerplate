import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ReceiptText } from "lucide-react"
import { ReactNode } from "react"

interface interfaceComponent{
  title:string
  value:string
  footerDescription:string
  icon?:ReactNode
}


export function CardDashboard({footerDescription,icon,title,value}:interfaceComponent) {
    return (
            <Card className="@container/card">
                <CardHeader className="flex items-center justify-around">
                    <div className="bg-gray-200 p-3 rounded">
                        {icon}
                    </div>
                    
                    <div className="w-[90%] pl-4">
                       <CardDescription>{title}</CardDescription>
                    <CardTitle className="text-3xl text- font-semibold tabular-nums @[250px]/card:text-3xl">
                       {value}
                    </CardTitle> 
                    </div>
                    
                </CardHeader>
                <CardFooter className="border-t flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">{footerDescription}</div>
                </CardFooter>
            </Card>
    )
  }
