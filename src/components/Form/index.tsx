import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addNewTask } from '../../redux/slices/taskSlice';

import style from './Form.module.scss';

type CalendarDate = {
  day: string,
  month: string,
  year: string
};

type NewAddedTask = {
  id: number,
  taskText: string,
  completed: boolean,
  year: string,
  month: string,
  day: string
};

export const Form: React.FC<CalendarDate> = () => {
  const [newTaskText, setNewTaskText] = React.useState<string>('');

  const calendarDate = useAppSelector((state) => state.tasks.calendarDate);
  const formYear = calendarDate.year;
  const formMonth = calendarDate.month;
  const formDay = calendarDate.day;

  const editedTask = useAppSelector((state) => state.tasks.editTask);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setNewTaskText(editedTask);
  }, [editedTask]);

  const newTaskTextHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setNewTaskText(e.target.value);
  };

  const handlerSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const newTask: NewAddedTask = {
      id: new Date().getTime(),
      taskText: newTaskText,
      completed: false,
      year: formYear,
      month: formMonth,
      day: formDay
    };

    dispatch(addNewTask(newTask));

    setNewTaskText('');
  };

  return (
    <div className={style.formWrap}>
      <h2 className={style.formTitle}>Добавить новое задание</h2>
      <form className={style.form}>
        <textarea
          className={style.message} 
          value={newTaskText}
          onChange={newTaskTextHandler}
        />
        <button 
          className={style.btn} 
          onClick={handlerSubmit}
          >
          Добавить
        </button>
      </form>
    </div>
  )
}
