import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './AppLayout.module.css';

import SideNav from './SideNav/SideNav';
const AppLayout = () => {
  return (
    <div className={styles.appLayout}>
      <SideNav />

      <div className={styles.appLayoutCenter}>
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
