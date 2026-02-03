import React, { ReactNode } from "react";

export default function ButtonDropDownLateralMenu({
  click,
  children
}: {
  click: () => void;
  children:ReactNode
}) {

  return (
    <span
      onClick={()=>{
        click()
      }}
      className="flex items-center gap-2 p-2 rounded-lg hover:bg-indigo-50 w-full text-left font-medium"
    >
      {children}

    </span>
  );
}
