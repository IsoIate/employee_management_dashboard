'use client'


import { Employee } from "../types/Employees";
import { Pie } from "react-chartjs-2";
interface Props {
  employees: Employee[];
  className?: string;
}

export default function GenderChartCard({ employees, className }: Props) {
  const male = employees.filter((e) => e.gender === "Male").length;
  const female = employees.filter((e) => e.gender === "Female").length;

  const data = {
    labels: ["남성", "여성"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [male, female],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  return (
    <>
      <div className={className}>
        <div className="bg-white p-4 rounded shadow flex items-center justify-center">
          <div className="w-64 h-full xl:w-96">
            <h2 className="mb-2">성별 분포</h2>
            <Pie data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
