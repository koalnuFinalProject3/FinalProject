import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./AppLout.module.css";
const AppLayout = () => {
    return (
        <div>
            <h1>폰트 테스트: 조선 굴림체 </h1>

            <h1 className={styles.kotraText}>폰트 테스트: 코트라 희망체</h1>

            <Link to="/">MainPage로 이동</Link>
            <Link to="/my-page">MyPage로 이동</Link>
            <Link to="/diary-page">DiaryPage로 이동</Link>
            <Link to="/test-page">TestPage로 이동</Link>
            <Outlet />
        </div>
    );
};

export default AppLayout;
