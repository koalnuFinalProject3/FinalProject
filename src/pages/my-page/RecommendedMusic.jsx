import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import useEmotionStore from '../../stores/useEmotionStore';
import useMusicStore from '../../stores/useMusicStore';

// 음악추천
const RecommendedMusic = () => {
  const { emotionToday } = useEmotionStore();
  const { recommendedMusic, setRecommendedMusicByEmotion } = useMusicStore();

  // 감정이 바뀔 때마다 음악을 추천
  useEffect(() => {
    if (emotionToday.text) {
      setRecommendedMusicByEmotion(emotionToday.text);
    }
  }, [emotionToday.text]);

  return (
    <div className="text-center mt-4">
      <h6 className="mb-2">추천음악</h6>

      {/* 음악 정보 표시 */}
      {recommendedMusic && (
        <p className="fw-bold mb-2">
          {recommendedMusic.title} - {recommendedMusic.artist}
        </p>
      )}

      {/* 컨트롤 버튼 */}
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button
          className="btn btn-light btn-sm"
          onClick={() => setRecommendedMusicByEmotion(emotionToday.text)}
        >
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedMusic;
