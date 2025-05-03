import styles from './DiaryFilter.module.css';

const DiaryFilter = ({ type, handleChange, selected }) => {
  return (
    <div className={styles.filterContainer}>
      <select
        className={styles.filterSelect}
        value={selected}
        onChange={handleChange}
      >
        {type === 'emotion' ? (
          <>
            <option value="">🤓 전체 감정</option>
            <option value="5">😄 기뻐</option>
            <option value="4">😊 좋아</option>
            <option value="3">😐 그저그래</option>
            <option value="1">😢 울적해</option>
            <option value="2">😞 우울해</option>
          </>
        ) : (
          <>
            <option value="newest">🕒 최신순</option>
            <option value="oldest">📜 오래된 순</option>
          </>
        )}
      </select>
    </div>
  );
};

export default DiaryFilter;
