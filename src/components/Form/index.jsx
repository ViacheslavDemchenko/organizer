import { React, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewTask, formDateOnchange } from '../../redux/tasks/slice';
import { formDateFormat } from '../../utils';

import style from './Form.module.scss';

export const Form = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // Начальная дата в форме
  const [newTaskText, setNewTaskText] = useState(''); // Текст записи в message

  const formDate = useSelector((state) => state.tasks.formDate); // Получаем из редакса новую дату при ее изменении
  const formYear = formDate.year; // Получаем из даты год
  const formMonth = formDate.month; // Получаем из даты месяц
  const formDay = formDate.day; // Получаем из даты день

  // Получаем из редакса текст редактируемого задания
  const editedTask = useSelector((state) => state.tasks.editTask);

  const dispatch = useDispatch();

  useEffect(() => {
    // При изменении редактируемого текста помещаем его в textarea
    setNewTaskText(editedTask);
  }, [editedTask]);

  useEffect(() => {
    // Задаем начальную дату в формате гггг-мм-дд
    const initialDate = new Date().toISOString().split('T')[0];
    setCurrentDate(initialDate);

    // Передаем в редакс начальную дату в нужном формате
    dispatch(formDateOnchange(formDateFormat(initialDate)));
  }, []);

  // Функция контроля изменения даты в форме
  const dateChangeHandler = (e) => {
    setCurrentDate(e.target.value);

    // Передаем в редакс новую дату в нужном формате
    dispatch(formDateOnchange(formDateFormat(e.target.value)));
  };

  // Функция контроля message
  const newTaskTextHandler = (e) => {
    setNewTaskText(e.target.value);
  };

  // Функция отправки новой записи
  const handlerSubmit = (e) => {
    e.preventDefault();

    // Новое сообщение
    const newTask = {
      id: new Date().getTime(),
      taskText: newTaskText,
      completed: false,
      year: formYear,
      month: formMonth,
      day: formDay
    };

    // Отправка нового сообщения в редакс
    dispatch(addNewTask(newTask));

    // Очистка message
    setNewTaskText('');
  };

  return (
    <div className={style.formWrap}>
      <h1 className={style.formTitle}>Добавить новое задание</h1>
      <form className={style.form}>
        <input
          className={style.date}  
          type="date" 
          value={currentDate}
          onChange={dateChangeHandler}
        />
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
