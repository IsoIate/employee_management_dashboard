"use client";
import { useEffect, useState } from "react";
import api from "../lib/api";
import { Employee } from "../types/Employees";
import ChartCard from "../components/ChartCard";
import GenderChartCard from "@/components/GenderChartCard";
import AgeChartCard from "@/components/AgeChartCard";
import DepartmentChartCard from "@/components/DepartmentChartCard";
import TotalEmployeesChartCard from "@/components/TotalEmployeesChartCard";
import PersonnelChartCard from "@/components/PersonnelChartCard";

export default function Dashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const tempEmployees = [
    {
      id: 5,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      leaveDate: "2023-03-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 6,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      leaveDate: "2023-03-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 7,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      leaveDate: "2023-07-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 8,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      leaveDate: "2023-04-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 9,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      leaveDate: "2023-06-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 10,
      name: "김철수",
      email: "chulsoo.kim@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 28,
      startDate: "2022-03-15",
      profileImage: "/images/profile1.jpg",
    },
    {
      id: 11,
      name: "이영희",
      email: "younghee.lee@example.com",
      department: "개발",
      position: "백엔드 개발자",
      gender: "Female",
      age: 31,
      startDate: "2021-08-01",
      profileImage: "/images/profile2.jpg",
    },
    {
      id: 12,
      name: "박민수",
      email: "minsoo.park@example.com",
      department: "디자인",
      position: "UI/UX 디자이너",
      gender: "Male",
      age: 26,
      startDate: "2023-01-10",
      profileImage: "/images/profile3.jpg",
    },
    {
      id: 13,
      name: "최지우",
      email: "jiwoo.choi@example.com",
      department: "마케팅",
      position: "콘텐츠 매니저",
      gender: "Female",
      age: 29,
      startDate: "2022-06-20",
      profileImage: "/images/profile4.jpg",
    },
    {
      id: 14,
      name: "정호준",
      email: "hojun.jung@example.com",
      department: "개발",
      position: "풀스택 개발자",
      gender: "Male",
      age: 33,
      startDate: "2020-11-05",
      profileImage: "/images/profile5.jpg",
    },
    {
      id: 15,
      name: "강민아",
      email: "mina.kang@example.com",
      department: "인사",
      position: "HR 매니저",
      gender: "Female",
      age: 30,
      startDate: "2019-09-17",
      profileImage: "/images/profile6.jpg",
    },
    {
      id: 16,
      name: "윤도현",
      email: "dohyun.yoon@example.com",
      department: "개발",
      position: "프론트엔드 개발자",
      gender: "Male",
      age: 27,
      startDate: "2023-02-01",
      profileImage: "/images/profile7.jpg",
    },
    {
      id: 17,
      name: "한서연",
      email: "seoyeon.han@example.com",
      department: "디자인",
      position: "그래픽 디자이너",
      gender: "Female",
      age: 25,
      startDate: "2022-04-12",
      profileImage: "/images/profile8.jpg",
    },
    {
      id: 18,
      name: "이준혁",
      email: "junhyuk.lee@example.com",
      department: "개발",
      position: "백엔드 개발자",
      gender: "Male",
      age: 32,
      startDate: "2021-12-01",
      profileImage: "/images/profile9.jpg",
    },
    {
      id: 19,
      name: "서지민",
      email: "jimin.seo@example.com",
      department: "마케팅",
      position: "SNS 마케터",
      gender: "Female",
      age: 28,
      startDate: "2023-03-05",
      profileImage: "/images/profile10.jpg",
    },
  ];

  useEffect(() => {
    // api.get("/employees").then((res) => setEmployees(res.data));
    setEmployees(tempEmployees);
  }, []);

  return (
    <div className="flex justify-center min-h-screen">
      <div className="p-6 w-3/4 text-center flex flex-col">
        <h1 className="text-2xl font-bold mb-4">대시보드</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 gap-4">
            <TotalEmployeesChartCard employees={employees} />
            <AgeChartCard employees={employees} className="w-full " />
          </div>
          <div className="grid grid-cols-1 gap-4 w-full h-full">
            <GenderChartCard employees={employees} />
            <DepartmentChartCard employees={employees} className="w-full " />
          </div>
          <div className="col-span-1 md:col-span-2">
            <PersonnelChartCard employees={employees} className="w-full " />
          </div>
        </div>
      </div>
    </div>
  );
}
