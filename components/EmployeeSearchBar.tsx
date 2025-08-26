"use client";

import { Employee } from "@/types/Employees";
import { useState } from "react";

interface Props {
  employees: Employee[];
  setSearchResult: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export default function EmployeeSearchBar({
  employees,
  setSearchResult,
}: Props) {
  function searchItem(value: string) {
    // 검색어에 따라 필터링
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        employee.department.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResult(filteredEmployees);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-4 mb-6">
      <div className="flex items-center gap-2">
        <label
          htmlFor="sort"
          className="text-lg mr-2 font-medium text-gray-600"
        >
          정렬:
        </label>
        <select
          id="sort"
          className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="name">이름순</option>
          <option value="department">부서순</option>
          <option value="position">직급순</option>
          <option value="joinDate">입사일순</option>
        </select>
      </div>

      <div className="w-full md:w-1/2">
        <input
          type="text"
          placeholder="사원 이름, 이메일, 부서 등으로 검색"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => {
            searchItem(e.target.value);
          }}
        />
      </div>
    </div>
  );
}
