"use client";
import { Employee } from "../types/Employees";
import { Pie, Bar } from "react-chartjs-2";
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
}

export default function ChartCard({ employees }: Props) {
  const male = employees.filter((e) => e.gender === "Male").length;
  const female = employees.filter((e) => e.gender === "Female").length;

  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "Gender Distribution",
        data: [male, female],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverOffset: 4,
      },
    ],
  };

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

  const ageData = {
    labels: Object.keys(ageGroups), // ["20대","30대","40대","50대 이상"]
    datasets: [
      {
        label: "연령별 사원 수",
        data: Object.values(ageGroups), // [3, 5, 2, 0]
        backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#4BC0C0"],
      },
    ],
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">성별 분포</h2>
        <Pie data={data} />
      </div>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-bold mb-2">연령별 분포</h2>
        <Bar data={ageData} />
      </div>
    </>
  );
}
