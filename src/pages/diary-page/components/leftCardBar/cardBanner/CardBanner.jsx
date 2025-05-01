import React from 'react';
import closeIcon from '../../../../../assets/icons/closeMd.svg';
import styles from './CarBanner.module.css';
const CardBanner = ({ handleClickClose, isOpen }) => {
  return (
    <div className={styles.banner}>
      {isOpen && <p className={styles.title}>내 다이어리 리스트 📚</p>}
      <img
        src={closeIcon}
        alt="closeIcon"
        className={styles.icon}
        onClick={handleClickClose}
      />
    </div>
  );
};

export default CardBanner;
