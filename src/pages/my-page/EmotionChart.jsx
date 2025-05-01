import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import React from 'react'
import { Pie } from 'react-chartjs-2'
import useEmotionChart from '../../hooks/useEmotionChart';

// 감정차트

ChartJS.register(ArcElement, Tooltip, Legend);

const EmotionChart = ({ period }) => {
  const { data = [], isLoading } = useEmotionChart(period);

  if (isLoading) return <p className="text-center">로딩 중...</p>;

  const chartData = {
    labels: data.map((d) => d.label),
    datasets: [
      {
        data: data.map((d) => d.value),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6FCF97', '#9B51E0'],
      },
    ],
  };

  return (
    <div>
      <h6 className="text-center mb-2">감정 분포도</h6>
      <Pie data={chartData} />
    </div>
  );
};

export default EmotionChart;