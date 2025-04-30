import React from 'react';
import styles from './SideNav.module.css';
import logo from '../../assets/images/FeelPiece.png';
import profile from '../../assets/images/profile.png';
import user from '../../assets/icons/user.svg';
import diary from '../../assets/icons/diary.svg';
import setting from '../../assets/icons/Settings.svg'

const SideNav = () => {
  return (
    <div className={styles.sideNavArea}>
        <div className={styles.sideNavInner}>
            {/* 로고 이름 */}
            <div className={`${styles.sideNavTitle} ${styles.sbCenter}`}>
                <img src={logo} alt='feel-piece-logo' />
                느낌한조각
            </div>

            {/* 프로필 */}
            <div className={`${styles.navProfileImageArea} ${styles.acCenter}`}>
                <img src={profile} alt="profile-image" />
                <div>OOO 님</div>
            </div>

            {/* 버튼 */}
            <div className={styles.btnArea}>
                <div className={styles.aCenter}>
                    <img src={user} alt="user" /><span>내 정보</span>
                </div>
                <div className={styles.aCenter}>
                    <img src={diary} alt="diary" /><span>내 일기</span>
                </div>
                <div className={styles.aCenter}>
                    <img src={setting} alt='setting' /><span>설정하기</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default SideNav