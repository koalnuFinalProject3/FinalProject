import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useEmotionMent = (emotionId) => {
  return useQuery({
    queryKey: ['recommendedQuote', emotionId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/emotionQuotes?emotionId=${emotionId}`);
      const quotes = res.data?.[0]?.quotes || [];
      if (quotes.length === 0) return '감정에 맞는 글귀가 없어요.';
      const randomIndex = Math.floor(Math.random() * quotes.length);
      return quotes[randomIndex];
    },
    enabled: !!emotionId,
  });
};

export default useEmotionMent;