import styles from './CardDetail.module.css';
import closeIcon from '../../../../../assets/icons/closeMd.svg';
const CardDetail = ({ handleClickCard }) => {
  const dummyDate = '2023. 04. 29';
  const dummyContent = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem 
ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. 
Commodo odio aenean sed adipiscing diam done`;

  const handleEdit = () => {
    console.log('수정하기 클릭됨');
  };

  return (
    <div className={styles.cardContainer}>
      <img
        src={closeIcon}
        alt="closeIcon"
        className={styles.icon}
        onClick={handleClickCard}
      />

      <div className={styles.header}>
        <div className={styles.avatar}></div>
        <span className={styles.date}>{dummyDate}</span>
      </div>

      <div className={styles.body}>
        <button className={styles.editButton} onClick={handleEdit}>
          수정하기
        </button>
        <p className={styles.content}>{dummyContent}</p>
      </div>
    </div>
  );
};

export default CardDetail;
