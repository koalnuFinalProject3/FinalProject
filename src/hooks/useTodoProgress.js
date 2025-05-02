import { useEffect, useState } from 'react';
import axios from 'axios';

const useTodoProgress = (startDate, endDate) => {
  const [progress, setProgress] = useState({
    total: 0,
    completed: 0,
    progressRate: 0,
  });

  useEffect(() => {
    if (!startDate || !endDate) return;

    const fetchTodos = async () => {
      try {
        const res = await axios.get('http://localhost:3000/todos');
        const todos = res.data;

        const filtered = todos.filter((todo) => {
          return (
            todo.selectedDate >= startDate &&
            todo.selectedDate <= endDate
          );
        });

        const total = filtered.length;
        const completed = filtered.filter((todo) => todo.endYn).length;
        const progressRate = total === 0 ? 0 : (completed / total) * 100;

        setProgress({ total, completed, progressRate: progressRate.toFixed(1) });
      } catch (err) {
        console.error('TODO 불러오기 실패', err);
      }
    };

    fetchTodos();
  }, [startDate, endDate]);

  return progress;
};

export default useTodoProgress;