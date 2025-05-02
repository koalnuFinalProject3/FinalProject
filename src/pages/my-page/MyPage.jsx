// src/pages/my-page/MyPage.jsx
import React, { useState } from 'react';
import EmotionStatus from './EmotionStatus';
import RecommendedMusic from './RecommendedMusic';
import PeriodTabs from './PeriodTabs';
import EmotionChart from './EmotionChart';
import TodoChart from './TodoChart';
import Header from '../../layout/Header/Header';

import useEmotionStore from '../../stores/useEmotionStore';
import useEmotions from '../../hooks/useEmotions';

import profile from '../../assets/images/profile.png';
import styles from './MyPage.module.css';

const MyPage = () => {
 
  const [periodInfo, setPeriodInfo] = useState({
    type: '일간',
    startDate: '2025-05-01',
    endDate: '2025-05-01'
  });

  const handlePeriodChange = (type, startDate, endDate) => {
    setPeriodInfo({ type, startDate, endDate });
  };

  const { emotionId } = useEmotionStore();
  const emotions = useEmotions();

  const matchedEmotion = emotions.find((e) => e.id === emotionId);
  const emoji = matchedEmotion
    ? require(`../../assets/images/${matchedEmotion.image}`)
    : profile;

  return (
    <div className={styles.myPageContainer}>
      {/* 상단 감정/음악 카드 */}
      <div className={styles.topSection}>
        {/* 감정 이미지 */}
        <div className={styles.emojiBox}>
        <p className={styles.emojiLabel}>오늘의 감정</p>
          <img
            src={emoji}
            alt="오늘의 감정"
            className={styles.emojiImage}
          />
        </div>

        {/* 감정 텍스트 + 추천 음악 */}
        <div className={styles.statusBox}>
          <EmotionStatus />
          <RecommendedMusic />
        </div>
      </div>

      {/* 필터 탭 */}
      <PeriodTabs onChange={handlePeriodChange} />

      {/* 하단 통계 영역 */}
      <div className={styles.chartRow}>
        <div className={styles.chartCol}>
        <EmotionChart startDate={periodInfo.startDate} endDate={periodInfo.endDate} />
        </div>
        <div className={styles.chartCol}>
        <TodoChart startDate={periodInfo.startDate} endDate={periodInfo.endDate} />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
