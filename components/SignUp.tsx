"use client";

import Phone from "../public/phone.svg";
import Name from "../public/name.svg";
import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<"login" | "signUp">>;
}

interface User {
  email: string;
  password: string;
  passwordCheck: string;
  username: string;
  phone: string;
}

export default function SignUp({ setPage }: Props) {
  const [emailValidate, setEmailValidate] = useState("hidden");
  const [passwordValidate, setPasswordValidate] = useState("hidden");
  const [phoneValidate, setPhoneValidate] = useState("hidden");
  const [signUpValidate, setSignUpValidate] = useState(true);
  const [data, setData] = useState<User>({
    email: "",
    password: "",
    passwordCheck: "",
    username: "",
    phone: "",
  });

  useEffect(() => {
    // 모든 유효성 검사 통과 및 모든 필드 입력 확인
    const isFormValid =
      emailValidate === "hidden" &&
      passwordValidate === "hidden" &&
      phoneValidate === "hidden" &&
      data.email !== "" &&
      data.username !== "" &&
      data.password !== "" &&
      data.passwordCheck !== "" &&
      data.phone !== "";

    setSignUpValidate(!isFormValid);
  }, [data, emailValidate, passwordValidate, phoneValidate]);
  function dataChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;

    // 이메일 검증
    if (e.target.name === "email") {
      const vaildEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const vaildResult = vaildEmail.test(value);

      if (!vaildResult) setEmailValidate("block");
      else setEmailValidate("hidden");
    }

    // 비밀번호 검증
    if (e.target.name === "password") {
      if (data.passwordCheck === e.target.value || data.passwordCheck === "")
        setPasswordValidate("hidden");
      else setPasswordValidate("block");
    }

    if (e.target.name === "passwordCheck") {
      if (data.password === e.target.value) setPasswordValidate("hidden");
      else setPasswordValidate("block");
    }

    // 휴대폰 검증
    if (e.target.name === "phone") {
      const vaildPhone = /^(01[016789])-?(\d{3,4})-?(\d{4})$/;
      const vaildResult = vaildPhone.test(value);

      if (!vaildResult) setPhoneValidate("block");
      else setPhoneValidate("hidden");
    }

    // 변경 값 세팅
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function signUpPost(e: React.FormEvent) {
    e.preventDefault();
    axios
      .post(`/api/signUp`, data)
      .then((res) => {
        console.log(res.data);
        alert("회원가입이 완료되었습니다!");
        setPage("login");
      })
      .catch((e) => {
        if (e.status === 409) console.log("이미 존재하는 아이디");
        else if (e.status === 500) console.log("서버 오류");
      });
  }

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center bg-black/10">
        <div className="flex flex-col w-full max-w-md px-4 py-8 bg-white rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <div className="self-center mb-6 text-xl font-normal text-gray-500 sm:text-2xl ">
            관리자 계정 회원가입
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
                    placeholder="이메일"
                    onChange={dataChange}
                  />
                </div>
              </div>

              <div className="flex flex-col mb-2">
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
              <div className="flex flex-col mb-2">
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
                    name="passwordCheck"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="비밀번호 확인"
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-2">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex w-[47px] h-[42px] items-center px-3 border-t bg-blue-300 border-l border-b  border-blue-300 text-white shadow-sm text-xs">
                    <Name></Name>
                  </span>
                  <input
                    type="text"
                    name="username"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="이름"
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="flex flex-col mb-6">
                <div className="flex relative ">
                  <span className="rounded-l-md inline-flex w-[47px] h-[42px] items-center px-3 border-t bg-blue-300 border-l border-b  border-blue-300 text-white shadow-sm text-xs">
                    <Phone></Phone>
                  </span>
                  <input
                    type="phone"
                    name="phone"
                    className=" rounded-r-lg flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="연락처"
                    onChange={dataChange}
                  />
                </div>
              </div>
              <div className="flex w-full gap-2">
                <button
                  type="submit"
                  disabled={signUpValidate}
                  className={`${
                    signUpValidate ? "cursor-not-allowed" : ""
                  } py-2 px-4 bg-blue-400 hover:bg-blue-500 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full border-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg `}
                  onClick={(e) => {
                    signUpPost(e);
                  }}
                >
                  회원가입
                </button>
                <button
                  type="button"
                  className="py-2 px-4  bg-red-500 hover:bg-red-600 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full border-none transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    setPage("login");
                  }}
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div
        className={`fixed -z-10 inset-0 top-[600px] flex items-center justify-center ${emailValidate}`}
        role="alert"
      >
        <div className="flex flex-col justify-center items-center w-full max-w-md px-4 py-8 text-white bg-red-300 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <p className="m-0 font-normal text-md">
            {" "}
            이메일 주소를 확인해주세요.{" "}
          </p>
        </div>
      </div>
      <div
        className={`fixed -z-10 inset-0 top-[800px] flex items-center justify-center ${passwordValidate}`}
        role="alert"
      >
        <div className="flex flex-col justify-center items-center w-full max-w-md px-4 py-8 text-white bg-red-300 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <p className="m-0 font-normal text-md"> 비밀번호를 확인해주세요. </p>
        </div>
      </div>
      <div
        className={`fixed -z-10 inset-0 top-[1000px] flex items-center justify-center ${phoneValidate}`}
        role="alert"
      >
        <div className="flex flex-col justify-center items-center w-full max-w-md px-4 py-8 text-white bg-red-300 rounded-lg shadow sm:px-6 md:px-8 lg:px-10">
          <p className="m-0 font-normal text-md">
            {" "}
            휴대폰번호를 확인해주세요.{" "}
          </p>
        </div>
      </div>
    </>
  );
}
