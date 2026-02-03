import React, { ReactNode } from "react";

export default function LinkLateralMenu({ children,onClick }: {children:ReactNode,onClick?:()=>void}) {
  return (
    <li onClick={onClick} className="p-2 rounded hover:bg-gray-100 cursor-pointer flex items-center gap-2">
      {children}
    </li>
  );
}
