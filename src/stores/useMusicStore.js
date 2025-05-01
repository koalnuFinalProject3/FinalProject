// src/stores/useMusicStore.js
import { create } from 'zustand';

// 감정별 음악 리스트 (감정명은 서버 또는 프론트 감정 기준에 맞게 수정)
const initialMusicMap = {
  매우좋음: [
    { id: 1, title: '매우좋음ex', artist: 'Joy Band', url: '...' },
    { id: 2, title: '매우좋음ex2', artist: 'Sunny', url: '...' },
  ],
  좋음: [
    { id: 3, title: '좋음ex', artist: 'Chillax', url: '...' },
    { id: 4, title: '좋음ex2', artist: 'Groover', url: '...' },
  ],
  보통: [
    { id: 5, title: '보통ex', artist: 'Flatline', url: '...' },
  ],
  좋지않음: [
    { id: 6, title: '안좋음ex', artist: 'Lifter', url: '...' },
  ],
  매우안좋음: [
    { id: 7, title: '매우안좋음ex', artist: 'Comfort', url: '...' },
  ],
};

const useMusicStore = create((set) => ({
  musicMap: initialMusicMap,
  recommendedMusic: null,

  // 감정 입력 → 해당 음악 리스트 중 랜덤으로 추천
  setRecommendedMusicByEmotion: (emotion) => {
    const list = initialMusicMap[emotion] || [];
    if (list.length === 0) {
      set({ recommendedMusic: null });
      return;
    }

    const random = list[Math.floor(Math.random() * list.length)];
    set({ recommendedMusic: random });
  },

  resetRecommendedMusic: () => set({ recommendedMusic: null }),
}));

export default useMusicStore;
