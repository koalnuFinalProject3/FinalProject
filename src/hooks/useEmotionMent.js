const emotionMentMap = {
    1: '괜찮아요, 오늘은 잠시 멈춰도 돼요.',
    2: '마음이 무거울 땐 나를 토닥여 주세요.',
    3: '평범한 하루도 소중해요.',
    4: '좋은 일이 생길 것 같은 하루예요!',
    5: '행복한 기운이 가득하네요! 😊',
  };
  
  const useEmotionMent = (emotionId) => {
    return emotionMentMap[emotionId] || '감정을 선택해주세요.';
  };
  
  export default useEmotionMent;
  