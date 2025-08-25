"use client";

import EmployeesPagination from "@/components/EmployeesPagination";
import Loading from "@/components/Loading";
import { Employee } from "@/types/Employees";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Params = {
  searchParams: {
    page: number;
  };
};

export default function LeaveEmployees({ searchParams }: Params) {
  const navigate = useRouter();
  const pathname = usePathname();
  const currentPage = Number(searchParams.page) || parseInt("1");
  const [totalPages, setTotalPages] = useState(0);
  const [leaveEmployees, setLeaveEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`/api/leaveEmployees?page=${currentPage}&limit=12`)
      .then((res) => {
        setLeaveEmployees(res.data.employees);
        setIsLoading(false);
      });
  }, [searchParams, currentPage]);

  if (isLoading || !leaveEmployees) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">퇴사사원 목록</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {leaveEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
              onClick={() => {
                navigate.push(`/employees/${employee.id}`);
              }}
            >
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>
          ))}
        </div>
      </div>
      <EmployeesPagination
        pathname={pathname}
        currentPage={currentPage}
        totalPages={totalPages}
      ></EmployeesPagination>
    </>
  );
}
