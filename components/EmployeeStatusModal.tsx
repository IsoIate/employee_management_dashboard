"use client";

import { Employee } from "@/types/Employees";
import axios from "axios";
import { useEffect, useState } from "react";
import { useModalStore } from "@/store/modalStore";
import { useRouter } from "next/navigation";

interface Props {
  employee?: Employee;
}

export default function EmployeeStatusModal({ employee }: Props) {
  const { isModalOpen, closeModal } = useModalStore();
  const [modalChange, setModalChange] = useState(0); // 0:작업 질의 1:작업 성공 2:작업 실패
  const navigate = useRouter();

  useEffect(() => {
    // unmount할 때 모달 닫기
    return () => {
      closeModal();
    };
  }, []);

  function employeeChange() {
    if (employee?.leaveDate) {
      axios
        .post(`/api/leaveEmployees/${employee.id}`)
        .then((res) => {
          res.data.result ? setModalChange(1) : setModalChange(2);
        })
        .catch((e) => {
          console.log(e);
        });
    } else if (employee) {
      axios
        .post(`/api/employees/${employee.id}`)
        .then((res) => {
          res.data.result ? setModalChange(1) : setModalChange(2);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

  if (!isModalOpen) return null;

  if (modalChange === 0) {
    return (
      <>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
        >
          <div className="w-96 h-64 text-center bg-white p-6 rounded-lg shadow-xl">
            <div className="flex flex-col justify-between h-full">
              <p className="mt-4 text-2xl font-bold text-red-600">
                사원정보 변경
              </p>
              <p className="px-6 py-2 text-lg text-black dark:text-gray-400">
                {employee?.leaveDate
                  ? "해당 사원을 복직처리 하시겠습니까?"
                  : "해당 사원을 퇴직처리 하시겠습니까?"}
              </p>
              <div className="flex items-center justify-between w-full gap-4 mt-8">
                <button
                  type="button"
                  className="py-2 px-4 bg-red-500 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-indigo-200 text-white w-full border-red-200 transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    employeeChange();
                  }}
                >
                  {employee?.leaveDate ? "복직" : "퇴직"}
                </button>
                <button
                  type="button"
                  className="py-2 px-4  bg-gray-100 hover:bg-gray-300 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-black w-full  border-gray-200 transition ease-in duration-200 text-center text-base font-semibold  focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    closeModal();
                  }}
                >
                  취소
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else if (modalChange === 1) {
    return (
      <>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
        >
          <div className="w-96 h-64 text-center bg-white p-6 rounded-lg shadow-xl">
            <div className="flex flex-col justify-between h-full">
              <p className="mt-4 text-2xl font-bold text-blue-600">
                사원정보 변경
              </p>
              <p className="px-6 py-2 text-lg text-black dark:text-gray-400">
                {employee?.leaveDate
                  ? "해당 사원이 복직처리 되었습니다."
                  : "해당 사원이 퇴직처리 되었습니다."}
              </p>
              <div className="flex items-center justify-between w-full gap-4 mt-8">
                <button
                  type="button"
                  className="py-2 px-4 bg-blue-400 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full border-blue-200 transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    employee?.leaveDate
                      ? navigate.push("/leaveEmployees")
                      : navigate.push("/employees");
                  }}
                >
                  확인
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50`}
        >
          <div className="w-96 h-64 text-center bg-white p-6 rounded-lg shadow-xl">
            <div className="flex flex-col justify-between h-full">
              <p className="mt-4 text-2xl font-bold text-red-600">
                사원정보 변경
              </p>
              <p className="px-6 py-2 text-lg text-black dark:text-gray-400">
                작업 중 문제가 발생했습니다.
              </p>
              <div className="flex items-center justify-between w-full gap-4 mt-8">
                <button
                  type="button"
                  className="py-2 px-4 bg-red-400 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full border-red-200 transition ease-in duration-200 text-center text-base font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  onClick={() => {
                    closeModal();
                  }}
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
