import { instance } from './instance';

/**
 * 모든 diary 데이터를 불러옵니다.
 * @returns {Promise<Array<{id: string, selectedDate: string, contents: string}>>}
 *
 * @example
 * const diaries = await getDiary();
 */
export const getDiary = async () => {
  const { data } = await instance.get('/diary');
  console.log('data 불러오기', data);
  return data;
};

/**
 * 새로운 diary를 추가합니다.
 * @param {{selectedDate: string, contents: string}} diary
 * @returns {Promise<Object>} 생성된 diary 객체
 *
 * @example
 * await createDiary({
 *   selectedDate: "2025-05-02",
 *   contents: "오늘은 재밌는 하루였다"
 * });
 */
export const createDiary = async (diary) => {
  const { data } = await instance.post('/diary', diary);
  console.log('보내기', data);
  return data;
};

/**
 * 특정 diary를 수정합니다.
 * @param {string} id - 수정할 diary의 ID
 * @param {{selectedDate: string, contents: string}} diary
 * @returns {Promise<Object>} 수정된 diary 객체
 *
 * @example
 * await updateDiary("d1", {
 *   selectedDate: "2025-05-02",
 *   contents: "생각보다 괜찮은 하루였음"
 * });
 */
export const updateDiary = async (id, diary) => {
  const { data } = await instance.put(`/diary/${id}`, diary);
  console.log('data 수정하기', data);
  return data;
};

/**
 * 특정 diary를 삭제합니다.
 * @param {string} id - 삭제할 diary의 ID
 * @returns {Promise<Object>} 삭제된 diary 객체
 *
 * @example
 * await deleteDiary("d1");
 */
export const deleteDiary = async (id) => {
  const { data } = await instance.delete(`/diary/${id}`);
  console.log('data 삭제하기', data);
  return data;
};
