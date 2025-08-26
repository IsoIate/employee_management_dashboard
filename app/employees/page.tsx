"use client";

import { Employee } from "@/types/Employees";
import axios from "axios";
import { useEffect, useState } from "react";
import { useModalStore } from "../../store/modalStore";
// import EmployeeDetail from "@/components/EmployeeDetail";
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
  const pathname = usePathname();
  const currentPage = Number(searchParams.page) || parseInt("1");
  const [totalPages, setTotalPages] = useState(0);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [allEmployeesData, setAllEmployeesData] = useState<Employee[]>([]);
  const [searchResult, setSearchResult] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 추후 모달 사용시 참고용
  // const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    axios.get(`/api/employees?page=${currentPage}&limit=12`).then((res) => {
      setTotalPages(res.data.totalPages);
      setEmployees(res.data.employees);
      setAllEmployeesData(res.data.allEmployeesData);
      setIsLoading(false);
    });
  }, [searchParams, currentPage]);

  if (isLoading || !employees) {
    return <Loading />;
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">사원 목록</h1>
        <EmployeeSearchBar
          employees={allEmployeesData}
          setSearchResult={setSearchResult}
        ></EmployeeSearchBar>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResult.length === 0
            ? employees.map((employee) => (
                <div
                  key={employee.id}
                  className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
                  onClick={() => {
                    // openModal(employee.id);
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
            : searchResult.map((employee) => (
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
      {searchResult.length === 0 ? (
        <EmployeesPagination
          pathname={pathname}
          currentPage={currentPage}
          totalPages={totalPages}
        ></EmployeesPagination>
      ) : (
        ""
      )}
    </>
  );
}
