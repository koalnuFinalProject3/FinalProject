import React from 'react';
import styles from './CardDetail.module.css';
import Header from '../../../../layout/Header/Header';
const CardDetail = () => {
  return (
    <div className={styles.container}>
      <Header />
      카드 디테일 부분
    </div>
  );
};

export default CardDetail;
