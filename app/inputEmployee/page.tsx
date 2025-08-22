"use client";

import { Employee } from "@/types/Employees";
import { useState } from "react";

export default function InputEmployees() {
  const [formData, setFormData] = useState<Employee>({
    name: "",
    position: "",
    department: "",
    email: "",
  });

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("등록할 사원 정보:", formData);
    alert("사원 정보가 성공적으로 등록되었습니다. (콘솔 로그 확인)");
    // 실제 API 호출 로직을 여기에 추가
    setFormData({
      name: "",
      position: "",
      department: "",
      email: "",
    });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 space-y-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          사원 등록
        </h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* 이름 입력 필드 */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              이름
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="홍길동"
            />
          </div>

          {/* 직책 입력 필드 */}
          <div>
            <label
              htmlFor="position"
              className="block text-sm font-medium text-gray-700"
            >
              직책
            </label>
            <input
              id="position"
              name="position"
              type="text"
              required
              value={formData.position}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="프론트엔드 개발자"
            />
          </div>

          {/* 부서 입력 필드 */}
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              부서
            </label>
            <input
              id="department"
              name="department"
              type="text"
              required
              value={formData.department}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="개발팀"
            />
          </div>

          {/* 이메일 입력 필드 */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="relative block w-full px-3 py-2 mt-1 placeholder-gray-400 border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="employee@company.com"
            />
          </div>

          {/* 제출 버튼 */}
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
