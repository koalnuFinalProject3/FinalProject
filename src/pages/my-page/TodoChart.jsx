import React from 'react';
import useTodoProgress from '../../hooks/useTodoProgress';
import styles from './MyPage.module.css';

const TodoChart = ({ startDate, endDate }) => {
  const { total, completed, progressRate } = useTodoProgress(startDate, endDate);
  const percent = Math.round(progressRate);
  const isEmpty = total === 0;

  // 바 색상 ( 51% 이상 초록, 이하 노랑)
  const barColor = percent >= 51 ? '#85c471' : '#f3c86a';

  return (
    <div className={styles.todoChartContainer}>
      <p className={styles.todoTitle}>TODO 진행률</p>
      <p className={styles.todoDate}>
        {startDate} ~ {endDate}
      </p>

      {isEmpty ? (
        <p className={styles.todoEmpty}>
          해당 기간에 TODO 데이터가 없습니다.
          <br />
          작은 목표부터 시작해보는 건 어때요?✍️
        </p>
      ) : (
        <>
          <p className={styles.todoRate}>
            {completed} / {total} 완료 ({percent}%)
          </p>

          <div className={styles.progressBarOuter}>
            <div
              className={styles.progressBarInner}
              style={{
                width: `${percent}%`,
                backgroundColor: barColor,
              }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default TodoChart;
