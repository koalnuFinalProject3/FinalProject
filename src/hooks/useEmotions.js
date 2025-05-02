import { useEffect, useState } from 'react';
import axios from 'axios';

const useEmotions = () => {
  const [emotions, setEmotions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/emotion')
      .then((res) => setEmotions(res.data))
      .catch((err) => console.error(err));
  }, []);

  return emotions;
};

export default useEmotions;