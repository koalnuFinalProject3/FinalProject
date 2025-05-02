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
