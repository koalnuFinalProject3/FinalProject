import React from 'react';
import styles from './Header.module.css';
import profile from '../../assets/images/happyChar.png';
import sun from '../../assets/icons/Sun.svg';
import useUserStore from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const { isLoggedIn, resetUser } = useUserStore();
  // const navigate = useNavigate();

  // const handleLogout = () => {
  //   resetUser();           // Zustand에서 사용자 정보 초기화
  //   navigate('/');        // 로그인 페이지 이동
  // };

  const handleLogin = () => {
    navigate('/');
  };

  return (
    <div className={styles.Header}>
    
      {/* <div className={`${styles.weatherArea} ${styles.aCenter}`}>
        오늘의 날씨: <img src={sun} alt="sun" />
      </div>

       */}
      {/* <div className={`${styles.logoutArea} ${styles.aCenter}`}>


        <img src={profile} alt="profile" />

        {isLoggedIn ? (
          <button type="button" className={styles.logoutBtn} onClick={handleLogout}>
            로그아웃
          </button>
        ) : (
          <button type="button" className={styles.logoutBtn} onClick={handleLogin}>
            로그인
          </button>
        )}
      </div> */}
      
    </div>
  );
};

export default Header;
