import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodayEmotion = () => {
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    console.log("today:!!!",today);
    const fetchTodayEmotion = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/emotion?selectedDate=${today}`);
        const daily = res.data[0]; // ✅ 여기서 정의

        console.log("daily==>",daily.emotion);//값 잘나옴

        if (!daily) {
          setEmotion(null); // 감정이 등록되지 않은 경우
          return;
        }

        const typeRes = await axios.get(`http://localhost:3000/emotionTypes/${Number(daily.emotion)}`);
        console.log("typeRes????",typeRes)
        setEmotion(typeRes.data); // { id, text, image }
      } catch (err) {
        console.error('오늘의 감정 데이터 에러:', err);
        setEmotion(null);
      }
    };

    fetchTodayEmotion();
  }, []);

  return emotion;
};

export default useTodayEmotion;
