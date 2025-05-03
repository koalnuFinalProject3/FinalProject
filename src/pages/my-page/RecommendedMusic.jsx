import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faForward, faPause } from '@fortawesome/free-solid-svg-icons';
import useRecommendedMusic from '../../hooks/useRecommendedMusic';
import useTodayEmotion from '../../hooks/useTodayEmotion';
import styles from './MyPage.module.css';

// 오디오 파일 import
import sampleMp3 from '../../assets/audio/sample.mp3';

const RecommendedMusic = () => {
  const todayEmotion = useTodayEmotion();
  const emotionId = todayEmotion?.id;
  const { data: recommendedMusic, isLoading, isError } = useRecommendedMusic(emotionId);

  const srcMap = {
    '/audio/sample.mp3': sampleMp3,
    // 다른 오디오도 여기에 추가 가능
  };

  const audioSrc = srcMap[recommendedMusic?.src] || null;
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={styles.musicBox}>
      <p className={styles.musicTitle}>🎵 추천 음악</p>

      {isLoading && <p className={styles.musicEmpty}>불러오는 중...</p>}
      {isError && <p className={styles.musicEmpty}>음악 정보를 가져오지 못했습니다.</p>}

      {!isLoading && !isError && recommendedMusic && (
        <>
          <p className={styles.musicInfo}>
            {recommendedMusic.title} - {recommendedMusic.artist}
          </p>

          {/* 오디오 태그 */}
          {audioSrc && <audio ref={audioRef} src={audioSrc} preload="auto" />}

          <div className={styles.musicControls}>
            <button onClick={handlePause}>
              <FontAwesomeIcon icon={faBackward} />
            </button>

            {isPlaying ? (
              <button onClick={handlePause}>
                <FontAwesomeIcon icon={faPause} />
              </button>
            ) : (
              <button onClick={handlePlay}>
                <FontAwesomeIcon icon={faPlay} />
              </button>
            )}

            <button disabled>
              <FontAwesomeIcon icon={faForward} />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendedMusic;
