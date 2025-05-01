import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchEmotionStats = async (period) => {
  const res = await axios.get('/api/emotion-chart', {
    params: { period }, // '일간', '주간', '월간'
  });
  return res.data;
};

const useEmotionChart = (period) => {
  return useQuery({
    queryKey: ['emotionChart', period],
    queryFn: () => fetchEmotionStats(period),
    select: (data) =>
      data.map((item) => ({
        label: item.emotion, // 예: '매우좋음'
        value: item.count,   // 예: 5
      })),
  });
};

export default useEmotionChart;