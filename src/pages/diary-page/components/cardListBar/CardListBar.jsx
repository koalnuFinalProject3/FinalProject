import React from 'react';
import styles from './CardListBar.module.css';
import CardForm from '../cardForm/CardForm';
const CardListBar = () => {
  return (
    <div className={styles.container}>
      <h1>다이어리 햄버거</h1>
      <h1>다이어리 필터</h1>
      <h1>다이어리 카드</h1>
      <div className={styles.innerContainer}>
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
        <CardForm />
      </div>
    </div>
  );
};

export default CardListBar;
