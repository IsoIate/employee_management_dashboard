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
  leaveEmployees: Employee[];
  className?: string;
};

export default function PersonnelChartCard({
  employees,
  leaveEmployees,
}: Props) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  const startDate = `${year - 1}-${month}-${day}`;
  const endDate = `${year}-${month}-${day}`;

  // 월별 입, 퇴사 직원 데이터
  const months = eachMonthOfInterval({ start: startDate, end: endDate }).map(
    (date) => format(date, "yyyy-MM")
  );

  const startCounts = months.map(
    (month) => employees.filter((e) => e.startDate?.startsWith(month)).length
  );

  const leaveCounts = months.map(
    (month) =>
      leaveEmployees.filter((e) => e.leaveDate?.startsWith(month)).length
  );

  // 1년간 입사, 퇴사한 직원 수 카운트
  const prevStartCounts = startCounts.reduce((num, sum) => num + sum, 0);
  const prevLeaveCounts = leaveCounts.reduce((num, sum) => num + sum, 0);

  // 재직 인원 계산
  let activeCount = employees.length - (prevStartCounts - prevLeaveCounts);
  const activeCounts = months.map((month, idx) => {
    if (idx === 0) activeCount = activeCount + startCounts[0] - leaveCounts[0];
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
        yAxisID: "y1",
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
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: Math.round((prevStartCounts + prevLeaveCounts) / 2),
        stacked: false,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "인원 수",
        },
      },

      y1: {
        beginAtZero: true,
        min: 0,
        max: Math.round(activeCount * 2),
        stacked: false,
        grid: {
          drawOnChartArea: false,
        },
        display: false,
      },

      x: {
        stacked: false,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow w-full h-80 flex items-center justify-center">
      <div className="w-full h-[300px] pb-[48px]">
        <h2 className="mb-2">인원 규모</h2>
        <Chart type="bar" data={data} options={options} />
      </div>
    </div>
  );
}
