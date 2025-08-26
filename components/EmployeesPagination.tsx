"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Container, Pagination, Form } from "react-bootstrap";

type Props = {
  pathname: string;
  currentPage: number;
  totalPages: number;
};

export default function EmployeesPagination({
  pathname,
  currentPage,
  totalPages,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageNumbers = [];
  const visiblePages = 10; // 한 번에 보여줄 페이지 수
  const startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
  const endPage = Math.min(totalPages, startPage + visiblePages - 1);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <div className="flex justify-center mt-6">
        <nav className="inline-flex items-center space-x-2">
          <button
            onClick={() => goToPage(currentPage - 1)}
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
              onClick={() => goToPage(page)}
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
            onClick={() => goToPage(currentPage + 1)}
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
