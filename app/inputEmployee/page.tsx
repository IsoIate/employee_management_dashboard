"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import EmployeeDetailCard from "../../components/EmployeeDetailCard";

export default function InputEmployee() {
  const [newId, setNewId] = useState(0);

  useEffect(() => {
    axios
      .get("/api/employees/lastId")
      .then((res) => {
        setNewId(res.data.id + 1);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <EmployeeDetailCard newId={newId}></EmployeeDetailCard>
    </>
  );
}
