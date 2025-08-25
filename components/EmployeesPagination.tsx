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
      <Container className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Item
            className="me-3"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {" "}
            ← 이전{" "}
          </Pagination.Item>
          {pageNumbers.map((page) => (
            <Pagination.Item
              active={page === currentPage}
              onClick={() => goToPage(page)}
              key={page}
            >
              {" "}
              {page}{" "}
            </Pagination.Item>
          ))}
          <Pagination.Item
            className="ms-3"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            {" "}
            다음 →{" "}
          </Pagination.Item>
        </Pagination>
      </Container>
    </>
  );
}
