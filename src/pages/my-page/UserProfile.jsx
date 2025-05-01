import React, { useRef } from 'react';
import useUserStore from '../../stores/useUserStore';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const { user, isLoggedIn, setUser } = useUserStore();
  const fileInputRef = useRef();

  const profileImage =
    user.profileImage ||
    'https://mblogthumb-phinf.pstatic.net/MjAyMDA2MTBfMTY1/MDAxNTkxNzQ2ODcyOTI2.Yw5WjjU3IuItPtqbegrIBJr3TSDMd_OPhQ2Nw-0-0ksg.8WgVjtB0fy0RCv0XhhUOOWt90Kz_394Zzb6xPjG6I8gg.PNG.lamute/user.png?type=w800';

  // 이미지 클릭 시 input 클릭 트리거
  const handleImageClick = () => {
    if (isLoggedIn) {
      fileInputRef.current.click();
    }
  };

  // 이미지 파일 선택 시 미리보기용 URL 생성
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setUser({ ...user, profileImage: previewUrl });

    }
  };

  return (
    <div className="text-center">
      <img
        src={profileImage}
        alt="프로필"
        className="rounded-circle"
        width={80}
        height={80}
        style={{ cursor: isLoggedIn ? 'pointer' : 'default' }}
        onClick={handleImageClick}
      />
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      <p className="mt-2 fw-bold">
        {isLoggedIn ? (
          user.nickname
        ) : (
          <Link to="/login" className="text-primary text-decoration-underline">
            로그인하러가기
          </Link>
        )}
      </p>

    </div>
  );
};

export default UserProfile;
