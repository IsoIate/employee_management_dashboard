"use client";

import { Employee } from "./../types/Employees";
import { useEffect, useState } from "react";

type Props = {
  searchResult: Employee[];
  setPaginatedResult: React.Dispatch<React.SetStateAction<Employee[]>>;
};

export default function EmployeesPagination({
  searchResult,
  setPaginatedResult,
}: Props) {
  const [currentPage, setCurrentPagePage] = useState(1); // 현재 페이지
  const visiblePages = 10; // 페이지네이션 목록 수
  const itemsPerPage = 12; // 한 페이지에 보여줄 사원 수
  const totalPages = Math.ceil(searchResult.length / itemsPerPage); // 총 페이지

  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  const pageNumbers = []; // 페이지네이션 목록 숫자

  useEffect(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    const currentData = searchResult.slice(start, end);

    setPaginatedResult(currentData);
  }, [currentPage, searchResult]);


  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-2">
          <button
            onClick={() => setCurrentPagePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-lg border text-sm font-medium 
        ${
          currentPage === 1
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
          >
            ← 이전
          </button>

          {pageNumbers.map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPagePage(page)}
              className={`px-3 py-1 rounded-lg border text-sm font-medium
          ${
            page === currentPage
              ? "bg-blue-500 text-white border-blue-500"
              : "text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
            >
              {page}
            </button>
          ))}

          <button
            onClick={() => setCurrentPagePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-lg border text-sm font-medium
        ${
          currentPage === totalPages
            ? "text-gray-400 border-gray-300 cursor-not-allowed"
            : "text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
          >
            다음 →
          </button>
        </nav>
      </div>
    </>
  );
}
