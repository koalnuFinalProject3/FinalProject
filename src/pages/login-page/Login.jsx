import { useState } from 'react';
import { D } from './constant';
import styles from './Login.module.css';
import { AnimatePresence, motion } from 'motion/react';

const svg = {
  start: { pathLength: 0, fill: 'rgba(23, 124, 61, 0)' },
  end: {
    pathLength: 1,
    fill: 'rgba(23, 124, 61, 1)',
  },
};

const Login = () => {
  const [isIntro, setIsIntro] = useState(true);

  const handleStartClick = () => {
    setIsIntro(false);
  };

  return (
    <div className={styles.container}>
      {/* 로그인 페이지 콘텐츠 - 인트로가 끝나면 표시됨 */}
      <AnimatePresence>
        {!isIntro && (
          <>
            <motion.div
              className={styles.icon}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <img src="public/Group_68.png" alt="캐릭터 이미지" />
            </motion.div>

            <motion.div
              className={styles.formContainer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <form>
                <input
                  type="text"
                  placeholder="아이디를 입력해주세요.."
                ></input>
                <input
                  type="password"
                  placeholder="비밀번호를 입력해주세요.."
                ></input>
                <motion.button className={styles.btn}>로그인</motion.button>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 타이틀 섹션 - layoutId를 사용하여 두 상태 간에 애니메이션 전환 */}
      <motion.div
        className={isIntro ? styles.introContainer : styles.landingContainer}
        layoutId="titleContainer"
      >
        <motion.h1 layoutId="title">
          <motion.svg
            width="500"
            height="200"
            viewBox="0 0 1657 358"
            fill="transparent"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              variants={svg}
              initial="start"
              animate="end"
              transition={{
                default: { duration: 100 },
                fill: { duration: 5, delay: 2 },
              }}
              stroke="#177C3D"
              strokeWidth="2"
              d={D}
              fill="transparent"
            />
          </motion.svg>
        </motion.h1>

        <motion.h3 layoutId="subtitle1">하루의 느낌, 하루의 조각.</motion.h3>
        <motion.h3 layoutId="subtitle2">나를 위한 기록을 시작하세요.</motion.h3>

        {isIntro && (
          <motion.div
            className={styles.startButton}
            onClick={handleStartClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            나의 조각 모으기
          </motion.div>
        )}
      </motion.div>

      {/* 인트로일 때만 오버레이 표시 */}
      {isIntro && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 10 }}
          layoutId="overlayBackground"
        ></motion.div>
      )}
    </div>
  );
};

export default Login;
