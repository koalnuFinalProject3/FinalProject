import React from 'react';
import styles from './ToDo.module.css';
import add from '../../../../assets/icons/add.svg';

const ToDo = ({
  isLoading,
  setNewTodoContent,
  newTodoContent,
  handleAddTodo,
  handleDeleteTodo,
  handleCheckChange,
  filteredEvents,
}) => {
  // 체크된 할 일 개수 계산
  const completedCount = filteredEvents.filter((event) => event.endYn).length;
  const totalCount = filteredEvents.length;

  // 진행률 계산: 체크된 할 일 수 / 전체 할 일 수 * 100
  const progress =
    totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);

  return (
    <div className={styles.modalcontainer}>
      <div className={styles.progressContainerContainer}>
        <div className={styles.progressContainer}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className={styles.progressText}>{progress}%</div>
      </div>
      <form onSubmit={handleAddTodo}>
        <div className={styles.inputArea}>
          <input
            type="text"
            value={newTodoContent}
            onChange={(e) => setNewTodoContent(e.target.value)}
            placeholder="write a todo here"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !newTodoContent.trim()}
            className={styles.buttonPlus}
          >
            {/* {isLoading ? (
              'loading...'
            ) : (
              <img
                src={add}
                alt="추가"
                style={{ opacity: isLoading ? 0 : 1 }}
              />
            )} */}
            {isLoading ? (
              <img
              src={add}
              alt="추가"
              style={{ opacity: isLoading ? 1 : 1 }}
            />
            ) : (
              <img
                src={add}
                alt="추가"
                style={{ opacity: isLoading ? 1 : 1 }}
              />
            )}
          </button>
        </div>
      </form>
      <ul>
        {filteredEvents.map((event, index) => (
          <li key={event.id} className={styles.todoItem}>
            <div className={event.endYn ? styles.completedText : ''}>
              {event.contents}
            </div>
            <div className={styles.editIcons}>
              <div className={styles.checkboxContainer}>
                <label >
                  <input
                    type="checkbox"
                    checked={!!event.endYn}
                    onChange={() => handleCheckChange(index)}
                  />
                  <span className={styles.checkmark}>
                    {event.endYn && (
                      <svg
                        width="15"
                        height="12"
                        viewBox="0 0 15 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 6L5.24264 10.2426L13.727 1.75732"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </span>
                </label>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDeleteTodo(event.id)}
              >
                <svg
                  width="18"
                  height="20"
                  viewBox="0 0 18 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4 5.45455H3.6V17.2727C3.6 17.5138 3.69489 17.745 3.86367 17.9155C4.03245 18.086 4.26131 18.1818 4.5 18.1818H13.5C13.7387 18.1818 13.9675 18.086 14.1363 17.9155C14.3051 17.745 14.4 17.5138 14.4 17.2727V5.45455ZM6.3 14.5455V9.09091C6.3 8.58883 6.70294 8.18182 7.2 8.18182C7.69706 8.18182 8.1 8.58883 8.1 9.09091V14.5455C8.1 15.0475 7.69706 15.4545 7.2 15.4545C6.70294 15.4545 6.3 15.0475 6.3 14.5455ZM9.9 14.5455V9.09091C9.9 8.58883 10.3029 8.18182 10.8 8.18182C11.2971 8.18182 11.7 8.58883 11.7 9.09091V14.5455C11.7 15.0475 11.2971 15.4545 10.8 15.4545C10.3029 15.4545 9.9 15.0475 9.9 14.5455ZM11.7 2.72727C11.7 2.48617 11.6051 2.255 11.4363 2.08452C11.2675 1.91403 11.0387 1.81818 10.8 1.81818H7.2C6.96131 1.81818 6.73245 1.91403 6.56367 2.08452C6.39489 2.255 6.3 2.48617 6.3 2.72727V3.63636H11.7V2.72727ZM13.5 3.63636H17.1C17.5971 3.63636 18 4.04338 18 4.54545C18 5.04753 17.5971 5.45455 17.1 5.45455H16.2V17.2727C16.2 17.996 15.9153 18.6895 15.409 19.201C14.9026 19.7125 14.2161 20 13.5 20H4.5C3.78392 20 3.09736 19.7125 2.59102 19.201C2.08467 18.6895 1.8 17.996 1.8 17.2727V5.45455H0.9C0.402944 5.45455 0 5.04753 0 4.54545C0 4.04338 0.402944 3.63636 0.9 3.63636H4.5V2.72727C4.5 2.00395 4.78467 1.31047 5.29102 0.799006C5.79736 0.287543 6.48392 0 7.2 0H10.8C11.5161 0 12.2026 0.287543 12.709 0.799006C13.2153 1.31047 13.5 2.00395 13.5 2.72727V3.63636Z"
                    fill="#B3B3B3"
                  />
                </svg>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
