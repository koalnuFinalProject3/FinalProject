import React from 'react';
import Header from '../../layout/Header/Header';
// import styles from "./MyPage.module.css";
import styles from './MainPage.module.css';
import CalendarArea from './components/CalendarArea/CalendarArea';

const MainPage = () => {
  return (
    <div className={styles.mypageArea}>
        <Header/>
        <CalendarArea/>
    </div>
  );
};

export default MainPage;
