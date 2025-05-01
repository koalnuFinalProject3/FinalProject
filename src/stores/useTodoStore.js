// src/stores/useTodoStore.js
import { create } from 'zustand';

const useTodoStore = create((set) => ({
  // 진행률 상태
  todoProgress: {
    total: 0,      // 전체 할 일 수
    completed: 0,  // 완료된 할 일 수
  },

  // 진행률 설정 함수
  setTodoProgress: (progress) => set({ todoProgress: progress }),
  
}));

export default useTodoStore;
