'use client'

import { Employee } from "../types/Employees";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

interface Props {
  employees: Employee[];
  className?: string;
}

export default function DepartmentChartCard({ employees, className }: Props) {
  const department = [...new Set(employees.map((e) => e.department))];
  const employeeDepData: Record<string, Employee[]> = {}; // record를 사용하면 [key:string]: Employee[] 형태를 좀더 간결하게 사용할 수 있음
  const employeeDepCount: Record<string, number> = {};

  department.forEach((dep) => {
    employeeDepData[dep] = employees.filter((e) => e.department === dep);
  });

  Object.keys(employeeDepData).forEach((dep) => {
    employeeDepCount[dep] = employeeDepData[dep].length;
  });

  const data = {
    labels: Object.keys(employeeDepCount),
    datasets: [
      {
        label: "부서별 사원 수",
        data: Object.values(employeeDepCount),
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    ticks: {
      stepSize: 2,
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
            <h2 className="mb-2">부서별 분포</h2>
            <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    </>
  );
}
