import { useState } from 'react';
import CardListBar from './components/leftCardBar/cardListBar/CardListBar';
import CardDefault from './components/rightCard/cardDefault/CardDefault';
import CardDetail from './components/rightCard/cardDetail/CardDetail';
import styles from './DiaryPage.module.css';

const DiaryPage = () => {
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드 데이터 저장

  const handleClickCard = (cardData) => {
    setSelectedCard(cardData); // 카드 클릭 시 데이터 저장
  };

  // ✅ 수정된 카드 데이터를 받아 selectedCard 갱신
  const handleClickBack = (updatedCard) => {
    if (updatedCard) {
      setSelectedCard(updatedCard); // 수정 내용 반영
    } else {
      setSelectedCard(null); // 단순히 닫기
    }
  };

  return (
    <div className={styles.container}>
      <CardListBar handleClickCard={handleClickCard} />
      {selectedCard ? (
        <CardDetail
          selectedCard={selectedCard}
          handleClickBack={handleClickBack} // 수정된 데이터 넘길 수 있도록 변경
        />
      ) : (
        <CardDefault />
      )}
    </div>
  );
};

export default DiaryPage;
