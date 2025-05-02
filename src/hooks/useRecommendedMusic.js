const musicByEmotion = {
    1: ['우울할 땐 잔잔한 피아노', 'Lo-fi Rain'],
    2: ['슬픈 감성 발라드', '눈물이 뚝뚝'],
    3: ['잔잔한 Acoustic', '무드 있는 하루'],
    4: ['신나는 팝', 'Dance Time!'],
    5: ['에너제틱 EDM', '행복 바이브 업!'],
  };
  
  const useRecommendedMusic = (emotionId) => {
    return musicByEmotion[emotionId] || [];
  };
  
  export default useRecommendedMusic;
  