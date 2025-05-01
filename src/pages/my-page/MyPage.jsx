// src/pages/my-page/MyPage.jsx
import React, { useState } from 'react';
import UserProfile from './UserProfile';
import EmotionStatus from './EmotionStatus';
import RecommendedMusic from './RecommendedMusic';
import PeriodTabs from './PeriodTabs';
import EmotionChart from './EmotionChart';
import TodoChart from './TodoChart';
import styles from './MyPage.module.css'; // 선택사항
import Header from '../../layout/Header/Header';

const MyPage = () => {
  const [period, setPeriod] = useState('일간');

  return (
    <div className="container py-4">
      <Header/>
      <br/>
      {/* 상단 영역 */}
      <div className="d-flex align-items-center mb-4">
        <UserProfile />
        <div className="ms-4 flex-grow-1">
          <EmotionStatus />
          <RecommendedMusic />
        </div>
      </div>

      {/* 필터 탭 */}
      <PeriodTabs onChange={setPeriod} />

      {/* 하단 통계 영역 */}
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <EmotionChart period={period}/>
        </div>
        <div className="col-md-6 mb-3">
          <TodoChart period={period}/>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
