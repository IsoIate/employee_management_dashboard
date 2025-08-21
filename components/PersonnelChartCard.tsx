import { parseISO, format, eachMonthOfInterval, addMonths } from "date-fns";
import { Employee } from "../types/Employees";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { ChartOptions } from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

type Props = {
  employees: Employee[];
  className?: string;
};

export default function PersonnelChartCard({ employees }: Props) {
  const startDate = new Date("2022-01-01");
  const endDate = new Date("2025-8-31");

  // 월별 데이터 배열
  const months = eachMonthOfInterval({ start: startDate, end: endDate }).map(
    (date) => format(date, "yyyy-MM")
  );

  const startCounts = months.map(
    (month) => employees.filter((e) => e.startDate?.startsWith(month)).length
  );

  const leaveCounts = months.map(
    (month) => employees.filter((e) => e.leaveDate?.startsWith(month)).length
  );

  // 재직 인원 계산
  let activeCount = 0;
  const activeCounts = months.map((month, idx) => {
    if (idx === 0) activeCount = startCounts[0] - leaveCounts[0];
    else activeCount = activeCount + startCounts[idx] - leaveCounts[idx];
    return activeCount;
  });

  const data = {
    labels: months,
    datasets: [
      {
        type: "line" as const,
        label: "재직 인원",
        data: activeCounts,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "입사",
        data: startCounts,
        backgroundColor: "rgba(54,162,235,0.7)",
        yAxisID: "y",
      },
      {
        type: "bar" as const,
        label: "퇴사",
        data: leaveCounts,
        backgroundColor: "rgba(255,99,132,0.7)",
        yAxisID: "y",
      },
    ],
  };

  const options: ChartOptions<"bar" | "line"> = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index" },
    scales: {
      y: {
        beginAtZero: true,
        stacked: false,
        title: {
          display: true,
          text: "인원 수",
        },
      },

      x: {
        stacked: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full h-80 flex items-center justify-center">
      <Chart type="bar" data={data} options={options} />
    </div>
  );
}
