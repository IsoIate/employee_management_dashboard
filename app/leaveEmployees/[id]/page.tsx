"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Employee } from "@/types/Employees";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import EmployeeDetailCard from "@/components/EmployeeDetailCard";

export default function LeaveEmployeeDetail() {
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee>();

  useEffect(() => {
    axios
      .post(`/api/leaveEmployees`, {
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

  // console.log(employees);

  return (
    <>
      <EmployeeDetailCard employees={employees}></EmployeeDetailCard>
    </>
  );
}
