// src/stores/useUserStore.js
import { create } from 'zustand';

//로그인 시 해당 유저 데이터 setUser를 통해 넣어주면 됨.
//수정할예정


const useUserStore = create((set) => ({
  user: {
    id: '',
    nickname: '',
    profileImage: '',
  },
  isLoggedIn: false, //로그인 여부

  setUser: (userData) =>
    set({
      user: userData,
      isLoggedIn: true,
    }),

  resetUser: () =>
    set({
      user: {
        id: '',
        nickname: '',
        profileImage: '',
      },
      isLoggedIn: false,
    }),
}));

export default useUserStore;
