"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
  Tooltip,
} from "chart.js";

// ChartJS가 이미 등록된 경우 중복 방지
let registered = false;

export function setupChartJS() {
  if (registered) return;
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    ArcElement,
    Legend,
    Tooltip
  );
  registered = true;
}
