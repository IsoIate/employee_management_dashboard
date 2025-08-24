"use client";

import { Employee } from "@/types/Employees";
import axios from "axios";
import { useEffect, useState } from "react";
import { useModalStore } from "../../store/modalStore";
import EmployeeDetail from "@/components/EmployeeDetail";

export default function Employees() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  // 추후 모달 사용시 참고용
  // const openModal = useModalStore((state) => state.openModal);

  useEffect(() => {
    axios.get("/api/employees").then((res) => {
      setEmployees(res.data.employees);
    });
  }, []);

  return (
    <>
      {/* <EmployeeDetail /> */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">사원 목록</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
              onClick={() => {
                // openModal(employee.id);
                location.href = `/employees/${employee.id}`;
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
    </>
  );
}
