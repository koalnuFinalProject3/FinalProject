import React from 'react';
import CardListBar from './components/leftCardBar/cardListBar/CardListBar';
import styles from './DiaryPage.module.css';
import CardDefault from './components/rightCard/cardDefault/CardDefault';
const DiaryPage = () => {
  return (
    <div className={styles.container}>
      <CardListBar />
      <CardDefault />
    </div>
  );
};

export default DiaryPage;
