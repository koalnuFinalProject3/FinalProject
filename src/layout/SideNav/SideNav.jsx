import React, { useState } from 'react';
import styles from './SideNav.module.css';
import logo from '../../assets/images/FeelPiece.png';
import profile from '../../assets/images/happyChar.png';
import my from '../../assets/icons/user.svg';
import diary from '../../assets/icons/diary.svg';
import setting from '../../assets/icons/Settings.svg';
import logout from '../../assets/icons/logout.svg';
import { Link } from 'react-router-dom';
import useUserStore from '../../stores/useUserStore';
import { useNavigate } from 'react-router-dom';

const SideNav = () => {
  const { user, setUser, resetUser } = useUserStore();

  const [editingType, setEditingType] = useState(null); // 'nickname' or 'image'
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  const handleLogout = () => {
    resetUser();           // Zustand에서 사용자 정보 초기화
    navigate('/');        // 로그인 페이지 이동
  };

  const openEditModal = (type) => {
    setEditingType(type);
    setInputValue(type === 'nickname' ? user.nickname : '');
  };
  //이미지 url로 변환
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setInputValue(base64); // 미리보기용 URL 저장
    };
    reader.readAsDataURL(file);
  };

  const closeModal = () => {
    setEditingType(null);
    setInputValue('');
  };

  const handleSave = () => {
    if (editingType === 'nickname') {
      const newNickname = inputValue.trim();
      if (newNickname && newNickname !== user.nickname) {
        setUser({ ...user, nickname: newNickname });
      }
    } else if (editingType === 'image' && inputValue) {
      setUser({ ...user, profileImage: inputValue });
    }
    closeModal();
  };

  return (
    <div className={styles.sideNavArea}>
      <div className={styles.sideNavInner}>
        {/* 로고 이름 */}
        <Link to="/main" className={styles.sideNavTitle} tabIndex={-1}>
          <img src={logo} alt="feel-piece-logo" />
          느낌한조각
        </Link>

        {/* 프로필 */}
        <div className={`${styles.navProfileImageArea} ${styles.acCenter}`}>
          <img src={user?.profileImage || profile} alt="profile-image" />
          <button className={styles.profileEditBtn} onClick={() => openEditModal('image')}>
            이미지 수정
          </button>

          <div className={styles.userNickArea}>
            {user?.nickname || 'unknown'}
            <button
              className={styles.nicknameEditBtn}
              onClick={() => openEditModal('nickname')}
            >
              ✏️
            </button>
          </div>
        </div>

        {/* 버튼 */}
        <div className={styles.btnArea}>
          <Link to="my" className={styles.aCenter}>
            <img src={my} alt="user" />
            <span>내 정보</span>
          </Link>
          <Link to="diary" className={styles.aCenter}>
            <img src={diary} alt="diary" />
            <span>내 일기</span>
          </Link>
          {/* <Link to="test" className={styles.aCenter}>
            <img src={setting} alt="setting" />
            <span>설정하기</span>
          </Link> */}
          <div className={styles.aCenter} onClick={handleLogout}>
            <img src={logout} alt="logout" />
            <span>로그아웃</span>
          </div>
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

      {/* 모달 */}
      {editingType && (
        <div className={styles.modalOverlay}>
          <form
            className={styles.modal}
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
          >
            <h4>{editingType === 'nickname' ? '닉네임 수정' : '이미지 변경'}</h4>

            {editingType === 'nickname' ? (
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className={styles.modalInput}
                autoFocus
              />
            ) : (
              <>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {inputValue && (
                  <img
                    src={inputValue}
                    alt="preview"
                    style={{ width: '100%', height: 'auto', marginTop: '1rem' }}
                  />
                )}
              </>
            )}

            <div className={styles.modalBtns}>
              <button type="submit">확인</button>
              <button type="button" onClick={closeModal}>
                취소
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};

export default SideNav;
