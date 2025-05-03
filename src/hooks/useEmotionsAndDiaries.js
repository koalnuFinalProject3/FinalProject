import { useState, useEffect } from 'react';
import { getEmotion } from '../apis/emotion';
import { getDiary } from '../apis/diary';

export const useEmotionsAndDiaries = () => {
  const [emotions, setEmotions] = useState([]);
  const [diaries, setDiaries] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emotionData = await getEmotion();
        const diaryData = await getDiary();
        setEmotions(emotionData);
        setDiaries(diaryData);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return { emotions, diaries };
};
