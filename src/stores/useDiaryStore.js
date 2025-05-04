import { create } from 'zustand';

const useDiaryStore = create((set) => ({
    id: null, 
    selectedDate: '',
    title: '',
    contents: "",
    emotion: 0,
    setEmotion: (data) => set({emotion: data}),
    /* Array */
    diary: [],
    setDiary: (data) => set({ diary: data }),
    emotions:[],
    setEmotions: (data)=> set({emotions : data}),
    resetEmotions: () => set({ emotions: [] }),
  }));
  
  export default useDiaryStore;