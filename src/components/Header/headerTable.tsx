import React from "react";
import { TableHead } from "../ui/table";

export default function HeaderTable({
  arrayHeader,
}: {
  arrayHeader: string[];
}) {
  return (
    <>
      <TableHead className="">ID</TableHead>
      {arrayHeader.map((item) => (
        <TableHead>{item}</TableHead>
      ))}
      <TableHead className="text-center">Opções</TableHead>
    </>
  );
}
