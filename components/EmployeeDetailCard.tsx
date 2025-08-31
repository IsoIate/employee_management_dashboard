"use client";
import React, { useEffect, useState } from "react";
import { Employee } from "@/types/Employees";
import Loading from "@/components/Loading";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import EmployeeStatusModal from "./EmployeeStatusModal";
import { useModalStore } from "@/store/modalStore";
import { useSession } from "next-auth/react";

interface Props {
  employees?: Employee;
  newId?: number;
}

export default function EmployeeDetailCard({ employees, newId }: Props) {
  const navigate = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isRole, setIsRole] = useState(true);
  const [newEmpId, setNewId] = useState<number | undefined>(undefined);
  const [gender, setGender] = useState("");
  const [emailValidate, setEmailValidate] = useState("invisible");
  const [employeeStatus, setEmployeeStatus] = useState("");
  const [formStatus, setFormStatus] = useState("");
  const { openModal } = useModalStore();
  const [employeeData, setEmployeeData] = useState<Employee>({
    id: 0,
    name: "",
    email: "",
    department: "",
    position: "",
    gender: "",
    age: 0,
    memo: "",
    status: "",
    form: "",
    startDate: "",
    leaveDate: "",
    profileImage: "",
  });

  useEffect(() => {
    if (employees) {
      setEmployeeData(employees);
      setGender(employees.gender);
      setEmployeeStatus(employees.status);
      setFormStatus(employees.form);
    } else if (newId !== undefined && newId !== 0) {
      setNewId(newId);
    }
  }, [employees, newId]);

  useEffect(() => {
    if (session?.user.role === "admin" || session?.user.role === "hr_admin")
      setIsRole(false);
    else setIsRole(true);
  }, [status]);

  const dataChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    // 이메일 검증
    if (e.target.name === "email") {
      const vaildEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      const vaildResult = vaildEmail.test(value);

      if (!vaildResult) setEmailValidate("visible");
      else setEmailValidate("invisible");
    }

    // radio, select 상태변경
    if (name === "gender") setGender(value);
    if (name === "status") setEmployeeStatus(value);
    if (name === "form") setFormStatus(value);

    // 변경 값 세팅
    setEmployeeData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const employeeDataSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 신규사원 프로필이미지
    if (newId) {
      employeeData.profileImage =
        "https://api.dicebear.com/7.x/avataaars/svg?seed=" + newId;
    }

    const excludeKey = ["leaveDate", "profileImage"];
    const emptyCheck = Object.entries(employeeData).some(
      ([key, value]) =>
        !excludeKey.includes(key) &&
        (value === null || value === undefined || value === "")
    );
    if (emptyCheck) {
      alert("작성하지 않은 항목이 있습니다.");
      return;
    }

    if (employees) {
      // 사원정보 수정
      axios
        .put(`/api/${pathname}`, {
          data: employeeData,
        })
        .then((res) => {
          if (res.data.res) {
            alert(
              "정상적으로 수정 되었습니다.\n사원 목록 페이지로 돌아갑니다."
            );
            navigate.back();
          } else {
            alert("수정에 문제가 생겼습니다.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (newId !== undefined && newId !== 0) {
      // 신규사원 등록
      axios
        .post(`/api/${pathname}`, {
          newId: newId,
          data: employeeData,
        })
        .then((res) => {
          if (res.data.res) {
            alert(
              "정상적으로 등록 되었습니다.\n사원 목록 페이지로 돌아갑니다."
            );
            navigate.push("/employees");
          } else {
            alert("등록에 문제가 생겼습니다.");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  if (!employeeData) {
    return <Loading />;
  }

  // 세션 로딩 중에는 null 반환
  if (status === "loading") return <Loading />;

  return (
    <>
      <EmployeeStatusModal employee={employees}></EmployeeStatusModal>
      <div className="min-h-screen p-4 sm:p-8 bg-gray-100 ">
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-xl ">
          <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center ">
            {employees ? "사원 정보 수정" : "사원 정보 등록"}
          </h1>

          <form onSubmit={employeeDataSubmit} className="space-y-6">
            {/* 프로필 이미지 */}

            <div className="flex flex-col items-center space-y-4 mb-20">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-300 ">
                <img
                  src={
                    employeeData.profileImage ||
                    `https://api.dicebear.com/7.x/avataaars/svg?seed=${newEmpId}`
                  }
                  alt="프로필 이미지"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* <label className="bg-blue-400 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500">
                이미지 변경
                <input type="file" className="hidden" />
              </label> */}
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
                  onChange={dataChange}
                  className="form-control"
                  disabled={isRole}
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
                  defaultValue={employeeData.id ? employeeData.id : newEmpId}
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
                    type="number"
                    name="age"
                    className="form-control"
                    value={employeeData.age}
                    onChange={dataChange}
                    disabled={isRole}
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
                        id="male"
                        name="gender"
                        value="Male"
                        checked={gender === "Male"}
                        onChange={dataChange}
                        disabled={isRole}
                      />
                      <label htmlFor="male" className="form-check-label">
                        남성
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="female"
                        name="gender"
                        value="Female"
                        checked={gender === "Female"}
                        onChange={dataChange}
                        disabled={isRole}
                      />
                      <label htmlFor="female" className="form-check-label">
                        여성
                      </label>
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
                  className="form-control"
                  onChange={dataChange}
                  disabled={isRole}
                />
                <div
                  className={`alert alert-warning mt-2 ${emailValidate}`}
                  role="alert"
                >
                  <p className="m-0"> 이메일 주소를 확인해주세요. </p>
                </div>
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
                  className="form-control"
                  onChange={dataChange}
                  disabled={isRole}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  직급
                </label>
                <input
                  type="text"
                  name="position"
                  value={employeeData.position}
                  className="form-control w-full"
                  onChange={dataChange}
                  disabled={isRole}
                />
              </div>
            </div>

            {/* 상태, 고용형태 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  상태
                </label>
                {employeeData.leaveDate ? (
                  <select className="form-select" name="status" disabled>
                    <option value="status_3">퇴사</option>
                  </select>
                ) : (
                  <select
                    className="form-select"
                    name="status"
                    value={employeeStatus}
                    onChange={dataChange}
                    disabled={isRole}
                  >
                    <option value="">-- 선택 --</option>
                    <option value="status_1">재직</option>
                    <option value="status_2">휴직</option>
                  </select>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  고용형태
                </label>
                <select
                  className="form-select"
                  name="form"
                  value={formStatus}
                  onChange={dataChange}
                  disabled={isRole}
                >
                  <option value="">-- 선택 --</option>
                  <option value="form_1">정규직</option>
                  <option value="form_2">계약직</option>
                  <option value="form_3">인턴/알바</option>
                </select>
              </div>
            </div>

            {/* 입사, 퇴사일 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  입사일
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={employeeData.startDate}
                  className="form-control"
                  onChange={dataChange}
                  disabled={isRole}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  퇴사일
                </label>
                <input
                  type="date"
                  name="leaveDate"
                  defaultValue={
                    employeeData.leaveDate ? employeeData.leaveDate : ""
                  }
                  className="form-control bg-gray-300 pointer-events-none"
                  readOnly
                />
              </div>
            </div>

            {/* 메모 */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  메모
                </label>
                <textarea
                  className="form-control resize-none w-full h-40"
                  name="memo"
                  value={employeeData.memo}
                  onChange={dataChange}
                  disabled={isRole}
                ></textarea>
              </div>
            </div>

            {/* 버튼 */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
                onClick={() => {
                  navigate.back();
                }}
              >
                돌아가기
              </button>
              {/* 복직, 퇴사버튼 */}
              {newId ? (
                ""
              ) : session?.user.role === "admin" ||
                session?.user.role === "hr_admin" ? (
                <button
                  type="button"
                  className="px-6 py-2 border bg-rose-500 rounded-md text-white hover:bg-gray-400"
                  onClick={() => {
                    openModal();
                  }}
                >
                  {employees?.leaveDate ? "복직" : "퇴사"}
                </button>
              ) : (
                ""
              )}
              {session?.user.role === "admin" ||
              session?.user.role === "hr_admin" ? (
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-400 text-white rounded-md border-none hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {employees ? "수정 완료" : "등록 완료"}
                </button>
              ) : (
                ""
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
