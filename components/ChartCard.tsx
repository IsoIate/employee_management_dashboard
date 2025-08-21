"use client";
import { Employee } from "../types/Employees";
import GenderChartCard from "./GenderChartCard";
import AgeChartCard from "./AgeChartCard";
import DepartmentChartCard from "./DepartmentChartCard";

interface Props {
  employees: Employee[];
}

export default function ChartCard({ employees }: Props) {
  return (
    <>
      <div className=" flex flex-wrap h-100 gap-4">
        <GenderChartCard employees={employees} className="w-full" />
        <AgeChartCard employees={employees} className="w-full" />
        <DepartmentChartCard employees={employees} className="w-full" />
      </div>
    </>
  );
}
