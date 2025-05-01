// src/pages/my-page/EmotionChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import useEmotionChart from '../../hooks/useEmotionChart';

ChartJS.register(ArcElement, Tooltip, Legend);

const EmotionChart = ({ startDate, endDate }) => {
  const { labels, data } = useEmotionChart(startDate, endDate);

  // 데이터가 비어있을 경우 처리
  const isEmpty = data.every((value) => value === 0);

  return (
    <div>
      <p className="mb-3">감정 분포도</p>
      <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
        {startDate} ~ {endDate}
      </p>

      {isEmpty ? (
        <p className="text-muted">해당 기간에 감정 데이터가 없습니다. <br />
        오늘 하루의 감정을 기록해보세요 😊
        </p>
      ) : (
        <Pie
          data={{
            labels,
            datasets: [
              {
                label: '감정 횟수',
                data,
                backgroundColor: ['#FFD93D', '#A1E3A1', '#7FD5A3', '#4F9D92', '#6E6E6E'],
                borderColor: '#ffffff',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'bottom',
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default EmotionChart;
