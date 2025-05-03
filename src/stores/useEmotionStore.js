import { create } from 'zustand';

const useEmotionStore = create((set) => ({
  emotionId: null, // 1~5 또는 null
  setEmotionId: (id) => set({ emotionId: Number(id) }),
  resetEmotion: () => set({ emotionId: null }),
}));

export default useEmotionStore;