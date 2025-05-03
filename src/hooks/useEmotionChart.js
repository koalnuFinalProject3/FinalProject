import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmotionChart = (startDate, endDate) => {
  const [emotionStats, setEmotionStats] = useState({
    labels: [],
    data: [],
  });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchEmotionStats = async () => {
      try {
        const [typesRes, emotionRes] = await Promise.all([
          axios.get('http://localhost:3000/emotionTypes'),
          axios.get('http://localhost:3000/emotion'),
        ]);

        const emotionTypes = typesRes.data;
        const emotionData = emotionRes.data;

        const filtered = emotionData.filter((item) =>
          item.selectedDate >= startDate && item.selectedDate <= endDate
        );

        const counts = Array(emotionTypes.length).fill(0); // [0, 0, 0, 0, 0]

        filtered.forEach((item) => {
          const idx = item.emotion - 1; // emotionId -> emotion
          if (idx >= 0 && idx < counts.length) counts[idx]++;
        });

        setEmotionStats({
          labels: emotionTypes.map((e) => e.text),
          data: counts,
        });
      } catch (error) {
        console.error('감정 통계 조회 실패:', error);
      }
    };

    fetchEmotionStats();
  }, [startDate, endDate]);

  return emotionStats;
};

export default useEmotionChart;
