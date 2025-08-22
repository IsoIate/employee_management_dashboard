"use client";

export default function Employees() {
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

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">사원 목록</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {tempEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center transform transition duration-300 hover:scale-105"
            >
              <img
                src={employee.profileImage}
                alt={employee.name}
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
              <h2 className="text-xl font-semibold text-gray-900">
                {employee.name}
              </h2>
              <p className="text-sm text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
