import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import useEmotionChart from '../../hooks/useEmotionChart';
import styles from './MyPage.module.css'; // 공통 스타일 적용

ChartJS.register(ArcElement, Tooltip, Legend);

const EmotionChart = ({ startDate, endDate }) => {
  const { labels, data } = useEmotionChart(startDate, endDate);

  const isEmpty = data.every((value) => value === 0);

  return (
    <div className={styles.chartContainer}>
      <p className={styles.chartTitle}>감정 분포도</p>
      <br/>
      <p className={styles.chartDate}>
        {startDate} ~ {endDate}
      </p>

      {isEmpty ? (
        <p className={styles.chartEmpty}>
          해당 기간에 감정 데이터가 없습니다.
          <br />
          오늘 하루의 감정을 기록해보세요 😊
        </p>
      ) : (
       <div style={{ height: '180px' }}>  {/* 높이 제한 */}
        <Pie
          data={{
            labels,
            datasets: [
              {
                label: '감정 횟수',
                data,
                backgroundColor: [
                  '#6E6E6E',              
                  '#A1E3A1',
                  '#7FD5A3',
                  '#4F9D92',
                  '#FFD93D',
                ],
                borderColor: '#ffffff',
                borderWidth: 2,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: 'bottom',
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    const dataset = tooltipItem.dataset;
                    const total = dataset.data.reduce((acc, val) => acc + val, 0);
                    const value = dataset.data[tooltipItem.dataIndex];
                    const percentage = ((value / total) * 100).toFixed(1);
                    const label = tooltipItem.label || '';
                    return `${label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
          }}
        />
        </div>
      )}
    </div>
  );
};

export default EmotionChart;
