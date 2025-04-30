import React from 'react';
import styles from './SideNav.module.css';
import logo from '../../assets/images/FeelPiece.png';
import profile from '../../assets/images/profile.png';
import user from '../../assets/icons/user.svg';
import diary from '../../assets/icons/diary.svg';
import setting from '../../assets/icons/Settings.svg'
import { Link } from 'react-router-dom';

const SideNav = () => {
  return (
    <div className={styles.sideNavArea}>
        <div className={styles.sideNavInner}>
            {/* 로고 이름 */}
            <Link to='/' className={`${styles.sideNavTitle}`}>
                <img src={logo} alt='feel-piece-logo' />
                느낌한조각
            </Link>

            {/* 프로필 */}
            <div className={`${styles.navProfileImageArea} ${styles.acCenter}`}>
                <img src={profile} alt='profile-image' />
                <div>OOO 님</div>
            </div>

            {/* 버튼 */}
            <div className={styles.btnArea}>
                <Link to='/my-page' className={styles.aCenter}>
                    <img src={user} alt='user' /><span>내 정보</span>
                </Link>
                <Link to='/diary-page' className={styles.aCenter}>
                    <img src={diary} alt='diary' /><span>내 일기</span>
                </Link>
                <Link to='/test-page' className={styles.aCenter}>
                    <img src={setting} alt='setting' /><span>설정하기</span>
                </Link>
            </div>

            {/* footer */}
            <div className={`${styles.footer}`}>
                <div>이 프로젝트는 5명의 조각들이 함께 만든 감정의 기록입니다. </div>
                <div>
                    <div>Team Members:</div>
                    <div>안연섭, 유용민, 정다원, 정이레, 최주연</div>
                </div>
                <div className={`${styles.footerName}`}>ⓒ 2025 느낌한조각</div>
            </div>
        </div>
    </div>
  )
}

export default SideNav