"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Employee } from "@/types/Employees";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import EmployeeDetailCard from "@/components/EmployeeDetailCard";

export default function EmployeeDetail() {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee>();

  useEffect(() => {
    axios
      .post(`/api/employees`, {
        id: params.id,
      })
      .then((res) => {
        setEmployees(res.data);
        setIsLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [params.id]);

  if (!params || isLoading || !employees) {
    return <Loading />;
  }

  return (
    <>
      <EmployeeDetailCard employees={employees}></EmployeeDetailCard>
    </>
  );
}
