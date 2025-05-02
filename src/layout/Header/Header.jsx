import React from 'react';
import styles from './Header.module.css';
import profile from '../../assets/images/happyChar.png';
import sun from '../../assets/icons/Sun.svg';

const Header = () => {
  return (
    <div className={styles.Header}>
      <div className={`${styles.weatherArea} ${styles.aCenter}`}>
        오늘의 날씨: <img src={sun} alt="sun" />
      </div>
      <div className={`${styles.logoutArea} ${styles.aCenter}`}>
        {/* <img src={profile} alt="profile" />
        <span>로그아웃</span> */}
      </div>
    </div>
  );
};

export default Header;
