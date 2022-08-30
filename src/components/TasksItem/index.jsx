import React from 'react';
import trashCan from '../../assets/img/trash-can.svg';
import checkMark from '../../assets/img/check-mark.svg';

import style from './TaskItem.module.scss';

export const TasksItem = ({id, text, deleteTask, fulfillTask, fulfilled}) => {
  return (
    <>
      <div 
        className={style.taskItem}

      >
        <p className={fulfilled ? 'fulfilled' : null}>{text}</p>
        <div className={style.btnWrap}>
          <button className={style.btnCheckMark} onClick={() => fulfillTask(id)}>
            <img src={checkMark} alt="Указать как выполненное" width="20" height="26" />
          </button>
          <button className={style.btnTrashCan} onClick={() => deleteTask(id)}>
            <img src={trashCan} alt="Удалить задание" width="20" height="20" />
          </button>
        </div>
      </div>
    </>
  );
}