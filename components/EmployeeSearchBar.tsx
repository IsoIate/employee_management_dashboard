"use client";

import { Employee } from "@/types/Employees";
import { useEffect, useState } from "react";

interface Props {
  employees: Employee[];
  searchResult: Employee[];
  setSearchResult: React.Dispatch<React.SetStateAction<Employee[]>>;
}

export default function EmployeeSearchBar({
  employees,
  searchResult,
  setSearchResult,
}: Props) {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortStatus, setSortStatus] = useState<keyof Employee>("id");
  const positionOrder = ["사원", "주임", "대리", "과장", "팀장", "부장"];

  // 정렬값 변경시마다 실행
  useEffect(() => {
    sortItems(sortStatus);
  }, [sortStatus, sortOrder]);

  // 실시간 검색결과 반영
  function searchItem(value: string) {
    const filteredEmployees = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(value.toLowerCase()) ||
        employee.department.toLowerCase().includes(value.toLowerCase())
    );

    setSearchResult(filteredEmployees);
  }

  // 정렬값 변경
  function sortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const sortKey = e.target.value as keyof Employee;

    setSortStatus(sortKey);
    setSortOrder("asc");
  }

  // 오름차순, 내림차순
  function sortSeqChange() {
    sortOrder === "asc" ? setSortOrder("desc") : setSortOrder("asc");
  }

  // 정렬 함수
  function sortItems(sortKey: keyof Employee) {
    const list = searchResult.length === 0 ? employees : searchResult;
    const sortedEmployees = [...list].sort((a, b) => {
      if (sortKey === "position") {
        const A = positionOrder.indexOf(a.position);
        const B = positionOrder.indexOf(b.position);

        return sortOrder === "asc" ? A - B : B - A;
      } else if (typeof a[sortKey] === "number") {
        return sortOrder === "asc"
          ? a[sortKey] - b[sortKey]
          : b[sortKey] - a[sortKey];
      }
      return sortOrder === "asc"
        ? a[sortKey].localeCompare(b[sortKey])
        : b[sortKey].localeCompare(a[sortKey]);
    });

    setSearchResult(sortedEmployees);
  }

  return (
    <div className="flex flex-col md:flex-row md:items-end md:justify-end gap-2 mb-6">
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
          name="sort"
          value={sortStatus}
          onChange={(e) => {
            sortChange(e);
          }}
        >
          <option value="id">사원번호</option>
          <option value="name">이름순</option>
          <option value="department">부서순</option>
          <option value="position">직급순</option>
          <option value="startDate">입사일순</option>
        </select>

        <button
          className="py-2 px-2.5 border rounded bg-gray-300 hover:bg-gray-400"
          onClick={() => {
            sortSeqChange();
          }}
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </button>
      </div>

      <div className="w-full md:max-w-xs">
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
