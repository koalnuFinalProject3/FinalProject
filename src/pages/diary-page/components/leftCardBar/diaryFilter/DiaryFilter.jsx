import { useState } from 'react';
import styles from './DiaryFilter.module.css';
import depressedChar from '../../../../../assets/images/depressedChar.png';
import happyChar from '../../../../../assets/images/happyChar.png';
import joyChar from '../../../../../assets/images/joyChar.png';
import sadChar from '../../../../../assets/images/sadChar.png';
import sosoChar from '../../../../../assets/images/sosoChar.png';
import startChar from '../../../../../assets/images/Img_landing.png';

const DiaryFilter = ({ type, selected, handleChange }) => {
  const emotionOptions = [
    { value: '', label: '전체 감정', img: startChar },
    { value: '5', label: '기뻐', img: joyChar },
    { value: '4', label: '좋아', img: happyChar },
    { value: '3', label: '그저그래', img: sosoChar },
    { value: '1', label: '울적해', img: sadChar },
    { value: '2', label: '우울해', img: depressedChar },
  ];

  const orderOptions = [
    { value: 'newest', label: '🕒  최신순' },
    { value: 'oldest', label: '📜  오래된 순' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (value) => {
    handleChange({ target: { value } });
    setIsOpen(false);
  };

  const options = type === 'emotion' ? emotionOptions : orderOptions;
  const selectedOption =
    options.find((opt) => opt.value === selected) || options[0];

  return (
    <div className={styles.DiaryFilterWrapper}>
      <div className={styles.selectedOption} onClick={() => setIsOpen(!isOpen)}>
        {selectedOption.img && (
          <img src={selectedOption.img} alt={selectedOption.label} />
        )}
        {selectedOption.label}
      </div>
      {isOpen && (
        <ul className={styles.optionList}>
          {options.map((opt) => (
            <li
              key={opt.value}
              className={styles.optionItem}
              onClick={() => handleSelect(opt.value)}
            >
              {opt.img && <img src={opt.img} alt={opt.label} />}
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DiaryFilter;
