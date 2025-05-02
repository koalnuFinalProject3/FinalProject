import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faPlay, faForward } from '@fortawesome/free-solid-svg-icons';
import useEmotionStore from '../../stores/useEmotionStore';
import useRecommendedMusic from '../../hooks/useRecommendedMusic';

const RecommendedMusic = () => {
  const { emotionId } = useEmotionStore();
  const recommendedMusic = useRecommendedMusic(emotionId);

  return (
    <div className="text-center mt-1">
      <p className="mb-2">🎵 추천 음악</p>

      {recommendedMusic ? (
        <p className="fw-bold mb-1">
          {recommendedMusic.title} - {recommendedMusic.artist}
        </p>
      ) : (
        <p className="text-muted">감정에 맞는 추천 음악이 없습니다.</p>
      )}

      <div className="d-flex justify-content-center align-items-center gap-3">
        <button className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faBackward} />
        </button>
        <button className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faPlay} />
        </button>
        <button className="btn btn-light btn-sm">
          <FontAwesomeIcon icon={faForward} />
        </button>
      </div>
    </div>
  );
};

export default RecommendedMusic;
