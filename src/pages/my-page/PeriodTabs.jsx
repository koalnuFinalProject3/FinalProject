import React, { useState } from 'react';
import styles from './MyPage.module.css';

// 날짜 계산 유틸
const getPeriodRange = (label, baseDateStr) => {
  const base = new Date(baseDateStr);

  if (label === '일간') {
    return {
      startDate: baseDateStr,
      endDate: baseDateStr,
    };
  }

  if (label === '주간') {
    const day = base.getDay();
    const diffToMonday = (day + 6) % 7;
    const start = new Date(base);
    start.setDate(base.getDate() - diffToMonday);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  }

  if (label === '월간') {
    const start = new Date(base.getFullYear(), base.getMonth(), 1);
    const end = new Date(base.getFullYear(), base.getMonth() + 1, 0);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  }
};

const PeriodTabs = ({ onChange }) => {
  const [selected, setSelected] = useState('일간');
  const [baseDate, setBaseDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });

  const handleTabClick = (label) => {
    setSelected(label);
    const { startDate, endDate } = getPeriodRange(label, baseDate);
    onChange?.(label, startDate, endDate);
  };

  const handleDateChange = (e) => {
    const newBase = e.target.value;
    setBaseDate(newBase);
    const { startDate, endDate } = getPeriodRange(selected, newBase);
    onChange?.(selected, startDate, endDate);
  };

  return (
    <div className={styles.tabWrapper}>
      {/* 기간 탭 */}
      <div className={styles.tabButtons}>
        {['일간', '주간', '월간'].map((label) => (
          <button
            key={label}
            className={`${styles.tabButton} ${selected === label ? styles.active : ''}`}
            onClick={() => handleTabClick(label)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* 기준 날짜 선택 */}
      <div className={styles.dateInputGroup}>
        <label className={styles.dateLabel}>기준 날짜 :</label>
        <input
          type="date"
          value={baseDate}
          onChange={handleDateChange}
          className={styles.dateInput}
        />
      </div>
    </div>
  );
};

export default PeriodTabs;
