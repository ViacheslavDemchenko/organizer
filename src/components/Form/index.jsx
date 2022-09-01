import { React, useState, useEffect } from 'react';

import style from './Form.module.scss';

export const Form = ({addTask}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newTaskText, setNewTaskText] = useState('');

  useEffect(() => {
    const initialDate = new Date().toISOString().split('T')[0];
    console.log(new Date());
    setCurrentDate(initialDate);
  }, []);

  const dateChangeHandler = (e) => {
    setCurrentDate(e.target.value);
    // console.log(e.target.value);
  };

  const newTaskTextHandler = (e) => {
    setNewTaskText(e.target.value);
    // console.log(e.target.value);
  };

  const handlerSubmit = (e) => {
    e.preventDefault();
    const id = new Date().getTime(); 
    addTask(id, newTaskText, currentDate);
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
