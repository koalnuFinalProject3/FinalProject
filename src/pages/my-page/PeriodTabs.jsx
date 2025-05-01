import React, { useState } from 'react';

//그래프 탭

const PeriodTabs = ({ onChange }) => {
  const [selected, setSelected] = useState('일간');
  const periods = ['일간', '주간', '월간'];

  const handleClick = (label) => {
    setSelected(label);
    onChange?.(label); // 상위 컴포넌트로 선택된 기간 전달
  };

  return (
    <div className="d-flex justify-content-center gap-3 mb-3">
      {periods.map((label) => (
        <button
          key={label}
          className={`btn btn-sm ${selected === label ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => handleClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PeriodTabs;
