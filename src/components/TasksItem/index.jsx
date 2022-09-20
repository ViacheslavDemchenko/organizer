import React from 'react';
import trashCan from '../../assets/img/trash-can.svg';
import checkMark from '../../assets/img/check-mark.svg';
import editIcon from '../../assets/img/edit.svg';

import { useDispatch } from 'react-redux';
import { completeTask, deleteTask, editTask } from '../../redux/tasks/slice';

import style from './TaskItem.module.scss';

export const TasksItem = ({id, text, completed}) => {
  const dispatch = useDispatch();

  // Функция изменения статуса записи (выполнена / не выполнена)
  const onChangeComplete = (id) => {
    dispatch(completeTask(id));
  };

  // Функция удаления записи
  const onChangeDelete = (id) => {
    dispatch(deleteTask(id));
  };

  // Функция редактирования записи
  const onChangeEdit = (id) => {
    dispatch(editTask(id));
  };

  return (
    <>
      <div className={style.taskItem}>
        <p className={completed ? 'completed' : null}>{text}</p>
        <div className={style.btnWrap}>
          <button className={style.btnCheckMark} onClick={() => onChangeComplete(id)}>
            <img src={checkMark} alt="Указать как выполненное" width="20" height="26" />
          </button>
          <button className={style.btnEdit} onClick={() => onChangeEdit(id)}>
            <img src={editIcon} alt="Удалить задание" width="8" height="8" />
          </button>
          <button className={style.btnTrashCan} onClick={() => onChangeDelete(id)}>
            <img src={trashCan} alt="Удалить задание" width="20" height="20" />
          </button>
        </div>
      </div>
    </>
  );
}
