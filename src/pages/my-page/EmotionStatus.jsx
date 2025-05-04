
import styles from './MyPage.module.css';
import useTodayEmotion from '../../hooks/useTodayEmotion';
import useEmotionMent from '../../hooks/useEmotionMent';


const EmotionStatus = () => {
  const todayEmotion = useTodayEmotion();
  const emotionId = todayEmotion?.id;
  const { data: ment, isLoading, isError } = useEmotionMent(emotionId);

  let text = '감정이 선택되지 않았습니다.';

  if (isLoading) {
    text = '글귀를 불러오는 중입니다...';
  } else if (isError) {
    text = '글귀를 불러오지 못했어요.';
  } else if (ment) {
    text = ment;
  }

  return (
    <div className={styles.emotionStatus}>
      <span>{text}</span>
    </div>
  );
};

export default EmotionStatus;
