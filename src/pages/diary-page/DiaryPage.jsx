import React from 'react';
import CardListBar from './components/cardListBar/CardListBar';
import styles from './DiaryPage.module.css';
const DiaryPage = () => {
  return (
    <div className={styles.container}>
      {/* <h1>다이어리 페이지</h1> */}
      <CardListBar />
    </div>
  );
};

export default DiaryPage;
