// pages/index.tsx
"use client";

import { SectionCards } from "@/components/dashborad.components/Sectioncard";
import { ChartAreaInteractive } from "@/components/dashborad.components/chart";

export default function Dashboard() {
  return (
    <>
    <div className="flex flex-1 flex-col overflow-y-scroll p-0">
          <div className="@container/main p-0 flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-2 md:gap-4 md:py-4">
              <SectionCards />
              <div className="px-4 lg:px-6">
               <ChartAreaInteractive /> 
              </div>
               <SectionCards />
            </div>
          </div>
        </div>
    </>
  );
}
