import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmotionChart = (startDate, endDate) => {
  const [emotionStats, setEmotionStats] = useState({
    labels: [],    // 감정 이름들 또는 ID들
    data: [],      // 각 감정의 빈도 수
  });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchEmotions = async () => {
      try {
        const res = await axios.get('http://localhost:3000/emotion'); // JSON Server 주소
        const emotionList = res.data;

        const filtered = emotionList.filter((item) => {
          return (
            item.seletedDate >= startDate &&
            item.seletedDate <= endDate
          );
        });

        // 감정별 카운팅 (1~5번 감정 기준)
        const emotionCounts = [0, 0, 0, 0, 0]; // index 0 → emotion 1

        filtered.forEach((item) => {
          const idx = item.emotion - 1;
          if (idx >= 0 && idx < 5) emotionCounts[idx]++;
        });

        setEmotionStats({
          labels: ['매우 좋음', '좋음', '보통', '나쁨', '매우 나쁨'], // 필요 시 hook 바깥으로 뺄 수 있음
          data: emotionCounts,
        });
      } catch (err) {
        console.error('감정 데이터 조회 실패:', err);
      }
    };

    fetchEmotions();
  }, [startDate, endDate]);

  return emotionStats;
};

export default useEmotionChart;
