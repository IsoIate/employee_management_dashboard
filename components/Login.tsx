"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<"login" | "signUp">>;
}

type User = {
  email: string;
  password: string;
};

export default function Login({ setPage }: Props) {
  const navigate = useRouter();
  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });
  function dataChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    // 변경 값 세팅
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = data.email;
    const password = data.password;
    const result = await signIn("credentials", {
      redirect: true, 
      callbackUrl: "/",   
      email,
      password,
    });

    if (!result) console.log("로그인 실패");
    else if (result.status === 200) {
      navigate.push("/");
    } else {
      console.log("에러 발생\nstatus : " + result.status);
    }
  };
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-normal text-gray-500 sm:text-2xl ">
            관리자 계정 로그인
          </div>
          <div className="mt-8">
            <form action="#" autoComplete="off">
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-blue-300 border-l border-b  border-blue-300 text-white shadow-sm text-sm">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z"></path>
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="email"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="아이디"
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex  items-center px-3 border-t bg-blue-300 border-l border-b  border-blue-300 text-white shadow-sm text-xs">
                    <svg
                      width="15"
                      height="15"
                      fill="currentColor"
                      viewBox="0 0 1792 1792"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z"></path>
                    </svg>
                  </span>
                  <input
                    type="password"
                    name="password"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="비밀번호"
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="flex w-full">
                <button
                  type="submit"
                  className="py-2 px-4  bg-blue-400 hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full border-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={login}
                >
                  로그인
                </button>
              </div>
            </form>
          </div>
          <div
            className="flex items-right justify-center mt-6"
            onClick={() => {
              setPage("signUp");
            }}
          >
            <p className="text-gray-500 hover:text-black text-md font-normal text-center cursor-pointer m-0 mt-1">
              계정을 만드시려면 클릭하십시오.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
