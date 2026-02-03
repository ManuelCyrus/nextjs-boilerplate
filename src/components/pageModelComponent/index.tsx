import React, { ReactNode } from "react";
import { Label } from "../ui/label";

interface PageModelProps {
  label?: string;
  children?: ReactNode;
  lateral_header: ReactNode;
}

export default function PageModelComponent({
  children,
  label,
  lateral_header,
}: PageModelProps) {
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-800 font-sans">
        <div>
          <main className="flex-1 p-2 py-4 overflow-auto">
            <div className=" bg-white border shadow p-2  rounded-[5px_5px_0px_0px]">
              <div className="flex rounded-md items-center justify-between">
                <Label className="text-xl md:text-2xl ml-3 font-bold hidden md:block ">
                  {label}
                </Label>

                <div className="flex gap-2 items-center w-full  md:w-[50%]">
                  {lateral_header}
                </div>
              </div>
              <section></section>
            </div>

            <main className="bg-white w-full border px-8  py-3 overflow-y-scroll max-h-[78vh] rounded-[0px_0px_5px_5px]">
              <main className="relative ">{children}</main>
            </main>
          </main>
        </div>
      </div>
    </>
  );
}
