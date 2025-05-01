import React from 'react'
import useTodoStore from '../../stores/useTodoStore';

//TODO 진행률 바

const TodoChart = () => {
  const { todoProgress } = useTodoStore();
  const percent =
    todoProgress.total > 0
      ? Math.round((todoProgress.completed / todoProgress.total) * 100)
      : 0;

  return (
    <div>
      <h6>TODO 진행률</h6>
      <div className="progress">
        <div
          className="progress-bar"
          style={{ width: `${percent}%` }}
          role="progressbar"
        >
          {percent}%
        </div>
      </div>
    </div>
  );
};

export default TodoChart