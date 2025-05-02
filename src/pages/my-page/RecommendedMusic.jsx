import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import useEmotionStore from '../../stores/useEmotionStore';
import useRecommendedMusic from '../../hooks/useRecommendedMusic';
import styles from './MyPage.module.css';

const RecommendedMusic = () => {
  const { emotionId } = useEmotionStore();
  const recommendedMusic = useRecommendedMusic(emotionId);

  return (
    <div className={styles.musicBox}>
      <p className={styles.musicTitle}>🎵 추천 음악</p>

      {recommendedMusic ? (
        <p className={styles.musicInfo}>
          {recommendedMusic.title} - {recommendedMusic.artist}
        </p>
      ) : (
        <p className={styles.musicEmpty}>감정에 맞는 추천 음악이 없습니다.</p>
      )}

      <div className={styles.musicControls}>
        <button>
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button>
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedMusic;
