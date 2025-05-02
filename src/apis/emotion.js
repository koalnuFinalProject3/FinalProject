import { instance } from './instance';

/**
 * 모든 emotion 데이터를 불러옵니다.
 * @returns {Promise<Array<{id: string, selectedDate: string, emotion: number}>>}
 *
 * @example
 * const emotions = await getEmotion();
 */
export const getEmotion = async () => {
  const { data } = await instance.get('/emotion');
  console.log('data 불러오기', data);
  return data;
};

/**
 * 새로운 emotion을 추가합니다.
 * @param {{selectedDate: string, emotion: number}} emotion
 * @returns {Promise<Object>} 생성된 emotion 객체
 *
 * @example
 * await createEmotion({
 *   selectedDate: "2025-05-02",
 *   emotion: 3
 * });
 */
export const createEmotion = async (emotion) => {
  const { data } = await instance.post('/emotion', emotion);
  console.log('보내기', data);
  return data;
};

/**
 * 특정 emotion을 수정합니다.
 * @param {string} id - 수정할 emotion의 ID
 * @param {{selectedDate: string, emotion: number}} emotion
 * @returns {Promise<Object>} 수정된 emotion 객체
 *
 * @example
 * await updateEmotion("e1", {
 *   selectedDate: "2025-05-02",
 *   emotion: 5
 * });
 */
export const updateEmotion = async (id, emotion) => {
  const { data } = await instance.put(`/emotion/${id}`, emotion);
  console.log('data 수정하기', data);
  return data;
};

/**
 * 특정 emotion을 삭제합니다.
 * @param {string} id - 삭제할 emotion의 ID
 * @returns {Promise<Object>} 삭제된 emotion 객체
 *
 * @example
 * await deleteEmotion("e1");
 */
export const deleteEmotion = async (id) => {
  const { data } = await instance.delete(`/emotion/${id}`);
  console.log('data 삭제하기', data);
  return data;
};
