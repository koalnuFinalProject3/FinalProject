import React from 'react'
import useEmotionStore from '../../stores/useEmotionStore'

// 오늘 감정 + 감정에 해당하는 글귀

const EmotionStatus = () => {
    const { emotionToday } = useEmotionStore();

  return (
    <div className="text-center">
      <img src={emotionToday.emoji} alt="감정 이모지" width={60} />
      <p className="text-muted mt-2">{emotionToday.text}</p>
    </div>
  )
}

export default EmotionStatus