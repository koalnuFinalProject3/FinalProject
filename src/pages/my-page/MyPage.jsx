
import React, { useState, useEffect  } from 'react';
import EmotionStatus from './EmotionStatus';
import RecommendedMusic from './RecommendedMusic';
import PeriodTabs from './PeriodTabs';
import EmotionChart from './EmotionChart';
import TodoChart from './TodoChart';
import profile from '../../assets/images/Img_landing.png';
import styles from './MyPage.module.css';
import useUserStore from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';
import useTodayEmotion from '../../hooks/useTodayEmotion';
import happy from '../../assets/images/happyChar.png';
import sad from '../../assets/images/sadChar.png';
import soso from '../../assets/images/sosoChar.png';
import joy from '../../assets/images/joyChar.png';
import depressed from '../../assets/images/depressedChar.png';

const imageMap = {
  'happyChar.png': happy,
  'sadChar.png': sad,
  'sosoChar.png': soso,
  'joyChar.png': joy,
  'depressedChar.png': depressed,
};

const MyPage = () => {
  
  const {isLoggedIn} = useUserStore();
  const navigate = useNavigate();

  const getToday = () => {
    return new Date().toISOString().split('T')[0];
  };

  const [periodInfo, setPeriodInfo] = useState({
    type: '일간',
    startDate: getToday(),
    endDate: getToday(),
  });

  const handlePeriodChange = (type, startDate, endDate) => {
    setPeriodInfo({ type, startDate, endDate });
  };

  const todayEmotion = useTodayEmotion();
  console.log("mypage==>>>>todayemotion",todayEmotion);
  const emoji = todayEmotion
    ? imageMap[todayEmotion.image]
    : profile;
    console.log("mypage==>>>>emoji",emoji);

    useEffect(() => {
      if (!isLoggedIn) {
        navigate('/');
      }
    }, [isLoggedIn]);


  return (
    <div className={styles.myPageContainer}>
      {/* 상단 감정/음악 카드 */}
      <div className={styles.topSection}>
        {/* 감정 이미지 */}
        <div className={styles.emojiBox}>
          <p className={styles.emojiLabel}>오늘의 감정</p>
          <img src={emoji} alt="오늘의 감정" className={styles.emojiImage} />
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
          <EmotionChart
            startDate={periodInfo.startDate}
            endDate={periodInfo.endDate}
          />
        </div>
        <div className={styles.chartCol}>
          <TodoChart
            startDate={periodInfo.startDate}
            endDate={periodInfo.endDate}
          />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
