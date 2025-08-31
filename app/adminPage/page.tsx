"use client";

import axios from "axios";
import { useEffect, useState } from "react";

interface User {
  email: string;
  username: string;
  phone: string;
  role: string;
  createdAt: Date;
}

export default function adminPage() {
  const [userData, setUserData] = useState<User[]>([]);
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [suggestionsVisible, setSuggestionsVisible] = useState<
    "hidden" | "block"
  >("block");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [modifiedRole, setModifiedRole] = useState("");
  const roleLabels: Record<string, string> = {
    admin: "관리자",
    hr_admin: "인사팀장",
    user: "일반직원",
  };

  useEffect(() => {
    axios
      .get("/api/adminPage")
      .then((res) => {
        setUserData(res.data.filteredData);
      })
      .catch((e) => console.log(e));
  }, []);

  function userSearch(value: string) {
    setUsername(value);
    setSuggestionsVisible("block");

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }

    // 실시간 검색
    const filtered = userData.filter(
      (user) =>
        user.username.toLowerCase().includes(value.toLowerCase()) ||
        user.email.toLowerCase().includes(value.toLowerCase())
    );

    setSuggestions(filtered);
  }

  function insertUserData(user: User) {
    setSuggestionsVisible("hidden");
    setUsername(user.username);
    setEmail(user.email);
    setRole(user.role);
  }

  function changeRole(e: React.ChangeEvent<HTMLSelectElement>) {
    setModifiedRole(e.target.value);
  }

  function updateRole() {
    if (!modifiedRole) {
      alert("수정할 권한을 선택해주세요");
      return;
    }

    axios
      .put("/api/adminPage", {
        data: {
          username: username,
          email: email,
          role: modifiedRole,
        },
      })
      .then((res) => {
        if (res.data) {
          alert("권한 변경이 완료되었습니다.");
          location.reload();
        } else {
          alert("권한 변경 중 문제가 발생했습니다.");
        }
      })
      .catch((e) => console.log(e));
  }

  return (
    <>
      <div className="min-h-screen p-4 sm:p-8 bg-gray-100 ">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl ">
          <div className="h-[150px]">
            <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center ">
              관리자 페이지
            </h1>
          </div>
          <form className="space-y-6 ">
            <h5 className="mb-2 text-gray-700"> 권한수정 </h5>
            <hr className="mb-5 border-gray-400" />

            {/* 이름, 사원번호 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  이름
                </label>
                <input
                  type="text"
                  name="username"
                  className="form-control w-full"
                  value={username}
                  onChange={(e) => {
                    userSearch(e.target.value);
                  }}
                />
                {suggestions.length > 0 && (
                  <ul
                    className={`absolute left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg w-full max-h-40 overflow-y-auto z-10 ${suggestionsVisible}`}
                  >
                    {suggestions.map((employee) => (
                      <li
                        key={employee.email}
                        className=" py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => insertUserData(employee)}
                      >
                        <span className="font-medium">{employee.username}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {employee.email}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  이메일
                </label>
                <input
                  type="text"
                  name="email"
                  value={email}
                  className="form-control bg-white cursor-not-allowed"
                  readOnly
                />
              </div>
            </div>

            {/* 현재 권한, 수정할 권한 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  현재 권한
                </label>
                <input
                  type="text"
                  name="role"
                  value={roleLabels[role] ?? ""}
                  className="form-control bg-white cursor-not-allowed"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  수정할 권한
                </label>
                <select
                  className="form-select"
                  name="modifiedRole"
                  onChange={changeRole}
                >
                  <option value="">-- 권한선택 --</option>
                  <option value="admin">관리자</option>
                  <option value="hr_admin">인사팀장</option>
                  <option value="user">일반직원</option>
                </select>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                onClick={() => { location.href="/"}}
              >
                취소
              </button>
              <button
                type="button"
                className="px-6 py-2 bg-blue-400 text-white rounded-md border-none hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => {
                  updateRole();
                }}
              >
                완료
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
