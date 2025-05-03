import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmotions = () => {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3000/emotionTypes')
      .then((res) => setEmotions(res.data))
      .catch((err) => console.error('감정 불러오기 실패:', err));
  }, []);

  return emotions;
};

export default useEmotions;
