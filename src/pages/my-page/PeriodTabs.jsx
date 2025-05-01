import React, { useState } from 'react';
import styles from './MyPage.module.css';

// 날짜 계산 유틸
const getPeriodRange = (label, baseDateStr) => {
  const base = new Date(baseDateStr);

  if (label === '일간') {
    const start = new Date(base);
    const end = new Date(base);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  }

  if (label === '주간') {
    const day = base.getDay();
    const diffToMonday = (day + 6) % 7;
    const start = new Date(base);
    start.setDate(base.getDate() - diffToMonday);

    const end = new Date(start); // 새로운 객체로 복사
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
    <div className={`${styles.tabButtons} d-flex align-items-center gap-3 flex-wrap`}>
    {/* 기간 선택 탭 */}
    <div className="d-flex gap-2">
      {['일간', '주간', '월간'].map((label) => (
        <button
          key={label}
          className={selected === label ? styles.active : ''}
          onClick={() => handleTabClick(label)}
        >
          {label}
        </button>
      ))}
    </div>

    {/* 기준 날짜 라벨 + 달력 */}
    <div className="d-flex align-items-center gap-2">
      <label style={{ fontSize: '14px', fontWeight: '500' }}>기준 날짜 :</label>
      <input
        type="date"
        value={baseDate}
        onChange={handleDateChange}
        style={{
          padding: '6px 12px',
          borderRadius: '8px',
          border: '1px solid #ccc',
          fontSize: '14px',
        }}
      />
    </div>
  </div>
  );
};

export default PeriodTabs;
