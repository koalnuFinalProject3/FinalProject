import React,{ useEffect } from 'react';
import Header from '../../layout/Header/Header';
// import styles from "./MyPage.module.css";
import styles from './MainPage.module.css';
import CalendarArea from './components/CalendarArea/CalendarArea';
import useUserStore from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const {user, isLoggedIn} = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className={styles.mypageArea}>
        <Header/>
        <CalendarArea/>
    </div>
  );
};

export default MainPage;
