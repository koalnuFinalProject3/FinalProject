import { instance } from './instance';

/**
 * 모든 todo 데이터를 불러옵니다.
 * @returns {Promise<Array<{id: string, selectedDate: string, contents: string, endYn: boolean}>>}
 *
 * @example
 * const todos = await getTodos();
 */
export const getTodos = async () => {
  const { data } = await instance.get('/todos');
  console.log('data 불러오기', data);
  return data;
};

/**
 * 새로운 todo를 추가합니다.
 * @param {{selectedDate: string, contents: string, endYn: boolean}} todo
 * @returns {Promise<Object>} 생성된 todo 객체
 *
 * @example
 * await createTodo({
 *   selectedDate: "2025-05-02",
 *   contents: "운동하기",
 *   endYn: false
 * });
 */
export const createTodo = async (todo) => {
  const { data } = await instance.post('/todos', todo);
  console.log('보내기', data);
  return data;
};

/**
 * 특정 todo를 수정합니다.
 * @param {string} id - 수정할 todo의 ID
 * @param {{selectedDate: string, contents: string, endYn: boolean}} todo
 * @returns {Promise<Object>} 수정된 todo 객체
 *
 * @example
 * await updateTodo("t1", {
 *   selectedDate: "2025-05-02",
 *   contents: "회의",
 *   endYn: true
 * });
 */
export const updateTodo = async (id, todo) => {
  const { data } = await instance.put(`/todos/${id}`, todo);
  console.log('data 수정하기', data);
  return data;
};

/**
 * 특정 todo를 삭제합니다.
 * @param {string} id - 삭제할 todo의 ID
 * @returns {Promise<Object>} 삭제된 todo 객체
 *
 * @example
 * await deleteTodo("t1");
 */
export const deleteTodo = async (id) => {
  const { data } = await instance.delete(`/todos/${id}`);
  console.log('data 삭제하기', data);
  return data;
};
