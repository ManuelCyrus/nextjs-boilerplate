import {
  Table,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReactNode } from "react";

interface TableInterface {
  children: ReactNode;
  headers: ReactNode;
}

export default function DefaultTable({ children, headers }: TableInterface) {
  return (
    <Table className="border-gray-100 relative">
      <TableHeader>
        <TableRow className="font-extrabold text-black border-gray-300">
          {headers}
        </TableRow>
      </TableHeader>

      {children}
    </Table>
  );
}
