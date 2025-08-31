'use client'

import { Employee } from "../types/Employees";
import { setupChartJS } from "@/lib/chart-setup";
import { Bar } from "react-chartjs-2";

interface Props {
  employees: Employee[];
  className?: string;
}

export default function AgeChartCard({ employees, className }: Props) {
  setupChartJS();

  const ageGroups = {
    "20대": 0,
    "30대": 0,
    "40대": 0,
    "50대 이상": 0,
  };

  employees.forEach((e) => {
    if (!e.age) return;
    if (e.age >= 20 && e.age < 30) ageGroups["20대"]++;
    else if (e.age >= 30 && e.age < 40) ageGroups["30대"]++;
    else if (e.age >= 40 && e.age < 50) ageGroups["40대"]++;
    else ageGroups["50대 이상"]++;
  });

  const data = {
    labels: Object.keys(ageGroups),
    datasets: [
      {
        label: "연령별 사원 수",
        data: Object.values(ageGroups),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    ticks: {
      stepSize: 5,
    },
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
          <div className="w-64 h-[300px] pb-[48px] xl:w-96 xl:h-[430px]">
            <h2 className="mb-2">연령별 분포</h2>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
