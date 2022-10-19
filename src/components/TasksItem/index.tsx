import React from 'react';
import close from '../../assets/img/close.svg';
import check from '../../assets/img/check.svg';
import edit from '../../assets/img/edit.svg';

import { useAppDispatch } from '../../hooks';
import { completeTask, deleteTask, editTask } from '../../redux/slices/taskSlice';

import style from './TaskItem.module.scss';

interface TasksItemProps {
  id: number,
  text: string,
  completed: boolean
};

export const TasksItem: React.FC<TasksItemProps> = ({id, text, completed}) => {
  const dispatch = useAppDispatch();

  const onChangeComplete = (id: number) => {
    dispatch(completeTask(id));
  };

  const onChangeDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const onChangeEdit = (id: number) => {
    dispatch(editTask(id));
  };

  return (
    <>
      <div className={style.taskItem}>
        <p className={completed ? 'completed' : ''}>{text}</p>
        <div className={style.btnWrap}>
          <button className={style.btnHandleTask} onClick={() => onChangeComplete(id)}>
            <span className={style.btnHandleTask__tooltip}>Выполнено</span>
            <img src={check} alt="Указать как выполненное" width="22" height="22" />
          </button>
          <button className={style.btnHandleTask} onClick={() => onChangeEdit(id)}>
          <span className={style.btnHandleTask__tooltip}>Редактировать</span>
            <img src={edit} alt="Удалить задание" width="10" height="10" />
          </button>
          <button className={style.btnHandleTask} onClick={() => onChangeDelete(id)}>
          <span className={style.btnHandleTask__tooltip}>Удалить</span>
            <img src={close} alt="Удалить задание" width="20" height="20" />
          </button>
        </div>
      </div>
    </>
  );
}
