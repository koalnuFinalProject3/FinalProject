import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import closeIcon from '../../assets/icons/closeLg.svg'

const Modal = ({ isOpen, onClose, children, title }) => {
  // 간단하게 body 스크롤 막기
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isOpen]);

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className={styles.overlay}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className={`${styles.modalContent}  modalDiaryContent`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              {title && <h2 className={styles.modalTitle}>{title}</h2>}
              <button
                onClick={onClose}
                className={styles.closeButton}
                aria-label="모달 닫기"
              >
                <img src={closeIcon}/>
              </button>
            </div>
            <div>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
