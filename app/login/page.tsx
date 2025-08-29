"use client";

import { useState } from "react";
import SignUp from "@/components/SignUp";
import Login from "@/components/Login";

export default function login() {
  const [page, setPage] = useState<"login" | "signUp">("login");

  return (
    <>
      {page === "login" ? (
        <Login setPage={setPage}></Login>
      ) : (
        <SignUp setPage={setPage}></SignUp>
      )}
    </>
  );
}
