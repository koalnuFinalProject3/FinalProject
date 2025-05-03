import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRecommendedMusic = (emotionId) => {
  return useQuery({
    queryKey: ['recommendedMusic', emotionId],
    queryFn: async () => {
      const id = Number(emotionId); // ← 안전한 형변환(숫자타입으로 db.json하고 맞춰놓은것!)
      if (!id) return null;

      const res = await axios.get(`http://localhost:3000/recommendedMusic?emotionId=${id}`);
      const all = res.data;

      if (all.length === 0) return null;

      const randomIndex = Math.floor(Math.random() * all.length);
      return all[randomIndex];
    },
    enabled: !!emotionId,
  });
};

export default useRecommendedMusic;
