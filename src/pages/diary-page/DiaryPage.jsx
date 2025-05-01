import React from 'react';
import CardListBar from './components/cardListBar/CardListBar';
import styles from './DiaryPage.module.css';
import Header from '../../layout/Header/Header';
import CardDetail from './components/cardDetail/CardDetail';
const DiaryPage = () => {
  return (
    <div className={styles.container}>
      {/* <h1>다이어리 페이지</h1> */}
      {/* <Header /> */}
      <CardListBar />
      <CardDetail />
    </div>
  );
};

export default DiaryPage;
