"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Employee } from "@/types/Employees";

// 사원 정보 타입 정의
interface EmployeeData {
  name: string;
  email: string;
  department: string;
  position: string;
  gender: string;
  age: number | string;
  startDate: string;
  leaveDate: string | null;
  profileImage: string | null;
}

interface Params {
  Props: {
    employeeId: number;
  };
}

export default function EmployeeDetail({ params }: any) {
  const [employeeData, setEmployeeData] = useState<Employee>();
  const [gender, setGender] = useState();

  useEffect(() => {
    axios
      .post(`/api/employees`, {
        id: params.id,
      })
      .then((res) => {
        setEmployeeData(res.data);
        setGender(res.data.gender);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // 예시 데이터로 초기 상태 설정
  const [formData, setFormData] = useState<EmployeeData>({
    name: "김철수",
    email: "chulsoo.kim@example.com",
    department: "개발팀",
    position: "프론트엔드 개발자",
    gender: "남자",
    age: 30,
    startDate: "2022-03-01",
    leaveDate: null,
    profileImage: "/images/profile.jpg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("수정된 사원 정보:", formData);
    // TODO: 서버로 데이터 전송 로직 구현
  };

  return (
    <>
      {employeeData ? (
        <div className="min-h-screen p-4 sm:p-8 bg-gray-100 ">
          <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl ">
            <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center ">
              사원 정보 수정
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 프로필 이미지 */}

              <div className="flex flex-col items-center space-y-4 mb-20">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 ">
                  <img
                    src={
                      employeeData.profileImage || "/images/default-profile.jpg"
                    }
                    alt="프로필 이미지"
                    className="w-full h-full object-cover"
                  />
                </div>
                <label className="bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500">
                  이미지 변경
                  <input type="file" className="hidden" />
                </label>
              </div>

              <h5 className="mb-2 text-gray-700"> 개인정보 </h5>
              <hr className="mb-5 border-gray-400" />

              {/* 이름, 사원번호 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    이름
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={employeeData.name}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    사원번호
                  </label>
                  <input
                    type="text"
                    name="id"
                    className="form-control bg-gray-300 pointer-events-none"
                    value={employeeData.id}
                    readOnly
                  />
                </div>
              </div>

              {/* 나이, 성별, 이메일 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      나이
                    </label>
                    <input
                      type="text"
                      name="age"
                      className="form-control"
                      value={employeeData.age}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      성별
                    </label>
                    <div className="flex flex-row gap-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="male"
                          checked={gender === "Male"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">남성</label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="gender"
                          value="female"
                          checked={gender === "Female"}
                          onChange={handleChange}
                        />
                        <label className="form-check-label">여성</label>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    이메일
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={employeeData.email}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </div>

              <h5 className="mb-2 text-gray-700"> 직원정보 </h5>
              <hr className="mb-5 border-gray-400" />

              {/* 부서, 직책 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    부서
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={employeeData.department}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    직책
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={employeeData.position}
                    className="form-control w-full"
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* 입사, 퇴사일 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    입사일
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    value={employeeData.startDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    퇴사일
                  </label>
                  <input
                    type="text"
                    name="leaveDate"
                    value={employeeData.leaveDate}
                    className="form-control bg-gray-300 pointer-events-none"
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              {/* 버튼 섹션 */}
              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-400 text-white rounded-md border-none hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  수정 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
