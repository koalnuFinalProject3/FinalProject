import { instance } from './instance';

export const getTodos = async () => {
  const { data } = await instance.get('/todos');
  console.log('data불러오기', data);
  return data;
};

export const createTodo = async (todo) => {
  const { data } = await instance.post('/todos', todo);
  console.log('보내기', data);
  return data;
};

/* 아니면 지우기... 👇🏻*/
export const deleteTodo = async (id) => {
  const { data } = await instance.delete(`/todos/${id}`);
  console.log('삭제된 항목:', data);
  return data;
};
/* 아니면 지우기 ... 👆🏻 */


export const updateTodo = async (id, updatedData) => {
  const { data } = await instance.patch(`/todos/${id}`, updatedData);
  return data;
};