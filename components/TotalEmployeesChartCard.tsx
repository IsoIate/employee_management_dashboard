'use client'

import { Doughnut } from "react-chartjs-2";
import { Employee } from "../types/Employees";

type Props = {
  employees: Employee[];
  className?: string;
};

export default function TotalEmployeesChartCard({
  employees,
  className,
}: Props) {
  const totalEmployees = employees.length;

  const data = {
    labels: ["인원 수"],
    datasets: [
      {
        data: [totalEmployees],
        backgroundColor: ["#4BC0C0"],
      },
    ],
  };

  const options = {
    cutout: "70%", // 도넛 두께 조절
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  };

  // 동적으로 텍스트 넣는 플러그인
  const centerTextPlugin = (totalEmployees: number) => ({
    id: "centerText",
    beforeDraw: (chart: any) => {
      const { width, height, ctx } = chart;
      ctx.save();

      const fontSize = (height / 100).toFixed(2);
      ctx.font = `${fontSize}em sans-serif`;
      ctx.textBaseline = "middle";

      const text = `${totalEmployees}`;
      const textX = Math.round((width - ctx.measureText(text).width) / 2);
      const textY = height / 2.5;

      ctx.fillText(text, textX, textY);
      ctx.restore();
    },
  });

  return (
    <div className={className}>
      <div className="bg-white p-4 rounded shadow flex items-center justify-center">
        <div className="w-64 h-full xl:w-96">
          <h2 className="mb-2">재직 인원</h2>
          <Doughnut
            key={totalEmployees} // state가 변경되면 재렌더링 되도록 key값을 변경해서 새로운 값 반영
            data={data}
            options={options}
            plugins={[centerTextPlugin(totalEmployees)]}
          />
        </div>
      </div>
    </div>
  );
}
