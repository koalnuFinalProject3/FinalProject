import useEmotionStore from '../../stores/useEmotionStore';
import useEmotions from '../../hooks/useEmotions';
import profile from '../../assets/images/Img_landing.png';
import styles from './MyPage.module.css';

const EmotionStatus = () => {
  const { emotionId } = useEmotionStore();
  const emotions = useEmotions();

  const matchedEmotion = emotions.find((e) => e.id === emotionId);
  const emoji = matchedEmotion
    ? require(`../../assets/images/${matchedEmotion.image}`)
    : profile;

  const text = matchedEmotion?.text || '감정이 선택되지않았습니다.';

  return (
    <div className={styles.emotionStatus}>
      <span>{text}</span>
    </div>
  );
};

export default EmotionStatus;
