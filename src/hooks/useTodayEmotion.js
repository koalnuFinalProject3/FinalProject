// zustand에서 useEmotionStore에 전역으로 오늘의 감정을 다루는 방식으로 변경도 가능
// 단, 로그인 시 감정을 바로 등록하고 활동을 하는 것으로 수정해야함
import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodayEmotion = () => {
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    

    const fetchTodayEmotion = async () => {
        try {
          const today = new Date().toISOString().split('T')[0];
          const res = await axios.get(`http://localhost:3000/dailyEmotions?selectedDate=${today}`);
          const daily = res.data[0];
          console.log("today!",today);
          console.log("daily!",daily);

          if (!daily) {
            setEmotion(null); // 선택된 감정 없음
            return;
          }
      
          const typeRes = await axios.get(`http://localhost:3000/emotionTypes/${Number(daily.emotionId)}`);
          setEmotion(typeRes.data);
        } catch (err) {
          console.error('감정 데이터 에러:', err);
          setEmotion(null); // 에러가 나도 안전하게 초기화
        }
      };

    fetchTodayEmotion();
  }, []);

  return emotion; // { id, text, image }
};

export default useTodayEmotion;
