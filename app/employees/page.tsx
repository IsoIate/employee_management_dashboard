"use client";

import { Employee } from "@/types/Employees";
import axios from "axios";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import EmployeesPagination from "@/components/EmployeesPagination";
import Loading from "@/components/Loading";
import EmployeeSearchBar from "@/components/EmployeeSearchBar";

type Params = {
  searchParams: {
    page: number;
  };
};

export default function Employees({ searchParams }: Params) {
  const navigate = useRouter();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchResult, setSearchResult] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [paginatedResult, setPaginatedResult] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get(`/api/employees`).then((res) => {
      setEmployees(res.data.employees);
      setIsLoading(false);
    });
  }, [searchResult]);

  if (isLoading || !employees) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">사원 목록</h1>
        <EmployeeSearchBar
          employees={employees}
          searchResult={searchResult}
          setSearchResult={setSearchResult}
        ></EmployeeSearchBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResult.length === 0 ? (
            <Loading />
          ) : (
            paginatedResult.map((employee) => (
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
            ))
          )}
        </div>
      </div>
      {searchResult.length === 0 ? (
        ""
      ) : (
        <EmployeesPagination
          searchResult={searchResult}
          setPaginatedResult={setPaginatedResult}
        ></EmployeesPagination>
      )}
    </>
  );
}
