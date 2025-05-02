import styles from './CardDetail.module.css';
import closeIcon from '../../../../../assets/icons/closeMd.svg';
import { emotionImages } from '../../../../../components/common/EmotionAssets';

const CardDetail = ({ selectedCard, handleClickBack }) => {
  const handleEdit = () => {
    console.log('수정하기 클릭됨');
  };

  return (
    <div className={styles.cardContainer}>
      <img
        src={closeIcon}
        alt="closeIcon"
        className={styles.icon}
        onClick={handleClickBack}
      />

      <div className={styles.header}>
        <div className={styles.avatar}>
          {/* {selectedCard.emotion} */}
          <img
            src={emotionImages[selectedCard.emotion]}
            alt={`emotion-${selectedCard.emotion}`}
            className={styles.avatarImg}
          />
        </div>

        <span className={styles.date}>{selectedCard.date}</span>
      </div>

      <div className={styles.body}>
        <button className={styles.editButton} onClick={handleEdit}>
          수정하기
        </button>
        <p className={styles.content}>{selectedCard.diaryContent}</p>
      </div>
    </div>
  );
};

export default CardDetail;
