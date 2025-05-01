// src/stores/useEmotionStore.js
import { create } from 'zustand';
import profile from '../assets/images/profile.png';

const useEmotionStore = create((set) => ({
  // 오늘의 감정 상태
  emotionToday: {
    emoji: profile, // 기본 이미지
    text: '감정을 선택해주세요',
  },

  // 감정 설정
  setEmotionToday: (emotionData) => set({ emotionToday: emotionData }),

  // 감정 초기화
  resetEmotion: () =>
    set({
      emotionToday: {
        emoji: profile,
        text: '감정을 선택해주세요',
      },
    }),
}));

export default useEmotionStore;