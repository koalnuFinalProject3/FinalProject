import { useState } from 'react';
import CardListBar from './components/leftCardBar/cardListBar/CardListBar';
import styles from './DiaryPage.module.css';
import CardDefault from './components/rightCard/cardDefault/CardDefault';
import CardDetail from './components/rightCard/cardDetail/CardDetail';
const DiaryPage = () => {
  const [selectedCard, setSelectedCard] = useState(true);
  const handleClickCard = () => {
    setSelectedCard((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <CardListBar handleClickCard={handleClickCard} />
      {selectedCard ? (
        <CardDefault />
      ) : (
        <CardDetail handleClickCard={handleClickCard} />
      )}
    </div>
  );
};

export default DiaryPage;
