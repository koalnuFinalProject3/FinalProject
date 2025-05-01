import React from 'react';
import useTodoProgress from '../../hooks/useTodoProgress';

const TodoChart = ({ startDate, endDate }) => {
  const { total, completed, progressRate } = useTodoProgress(startDate, endDate);

  const isEmpty = total === 0;

  return (
    <div>
      <p className="mb-3">TODO 진행률</p>
      <p className="text-muted mb-3" style={{ fontSize: '0.9rem' }}>
        {startDate} ~ {endDate}
      </p>

      {isEmpty ? (
        <p className="text-muted">
          해당 기간에 TODO 데이터가 없습니다.<br/>
          작은 목표부터 시작해보는 건 어때요?✍️
        </p>
      ) : (
        <>
          <p className="text-center fw-bold">
            {completed} / {total} 완료 ({percent}%)
          </p>

          <div
            className="mx-4"
            style={{
              height: '12px',
              backgroundColor: '#e9ecef',
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${percent}%`,
                height: '100%',
                backgroundColor: barColor,
                transition: 'width 0.5s ease',
              }}
            />
          </div>
        </>
      )}

    </div>
  );
};

export default TodoChart;
