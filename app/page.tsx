"use client";

import { useEffect, useState } from "react";
import { Employee } from "../types/Employees";
import GenderChartCard from "@/components/GenderChartCard";
import AgeChartCard from "@/components/AgeChartCard";
import DepartmentChartCard from "@/components/DepartmentChartCard";
import TotalEmployeesChartCard from "@/components/TotalEmployeesChartCard";
import PersonnelChartCard from "@/components/PersonnelChartCard";
import axios from "axios";
import { useSession } from "next-auth/react";
import Loading from "@/components/Loading";

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaveEmployees, setLeaveEmployees] = useState<Employee[]>([]);
  const { data: session, status } = useSession();

  useEffect(() => {
    axios.get("/api/totalEmployees").then((res) => {
      setEmployees(res.data.employees);
      setLeaveEmployees(res.data.leaveEmployees);
    });
  }, []);

  if (status === "loading") {
    return <Loading />;
  }

  if (status === "unauthenticated") {
    return null;
  }

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-6 w-3/4 text-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <TotalEmployeesChartCard employees={employees} />
            <AgeChartCard employees={employees} className="w-full " />
          </div>
          <div className="grid grid-cols-1 gap-4 w-full h-full">
            <GenderChartCard employees={employees} />
            <DepartmentChartCard employees={employees} className="w-full " />
          </div>
          <div className="col-span-1 md:col-span-2">
            <PersonnelChartCard
              employees={employees}
              leaveEmployees={leaveEmployees}
              className="w-full "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
