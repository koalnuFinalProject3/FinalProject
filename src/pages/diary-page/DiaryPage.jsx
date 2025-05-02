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

  return (
    <div className={styles.container}>
      <CardListBar handleClickCard={handleClickCard} />
      {selectedCard ? (
        <CardDetail
          selectedCard={selectedCard}
          handleClickBack={() => setSelectedCard(null)}
        />
      ) : (
        <CardDefault />
      )}
    </div>
  );
};

export default DiaryPage;
