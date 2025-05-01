import React, { useState } from 'react';
import styles from './TestPage.module.css'; // 모듈 CSS import
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import useModal from '../../hooks/useModal';
import Modal from '../../components/common/Modal';

// Chart.js 플러그인 등록
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const chartData = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
  datasets: [
    {
      label: 'Votes',
      data: [12, 19, 3, 5, 2],
      backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#9966ff'],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};

const TestPage = () => {
  const [date, setDate] = useState(new Date());
  const { isOpen, open, close } = useModal();

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <>
      <div className={styles.container}>
        <h1>폰트 및 컴포넌트 테스트</h1>
        <button className="btn btn-primary mb-4">부트스트랩 버튼</button>

        <h2 className="mb-3">Chart.js 테스트</h2>
        <div className={styles.chartWrapper}>
          <Bar data={chartData} options={chartOptions} />
        </div>

        <h2 className="mb-3">캘린더 테스트</h2>
        <Calendar onChange={handleDateChange} value={date} />
        <button onClick={open}>모달 테스트트</button>
      </div>
      <Modal title="하루 일기" onClose={close} isOpen={isOpen}>
        동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라 만세 무궁화
        삼천리 화려강산 대한사람 대한으로
      </Modal>
    </>
  );
};

export default TestPage;
