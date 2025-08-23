"use client";

import { Employee } from "@/types/Employees";
import axios from "axios";
import { useEffect, useState } from "react";

export default function LeaveEmployees() {
  const [leaveEmployees, setLeaveEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    axios.get("/api/employees").then((res) => {
      setLeaveEmployees(res.data.leaveEmployees);
    });
  }, []);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">퇴사사원 목록</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {leaveEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
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
