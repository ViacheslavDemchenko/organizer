import React from 'react';
import { useSelector } from 'react-redux';
import { TasksItem } from './../TasksItem';

import style from './TaskList.module.scss';

const months = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря'
];

export const TasksList = () => {
  const calendarDate = useSelector((state) => state.tasks.calendarDate); // Получаем дату в календаре из редакс
  const currentDayNotes = useSelector((state) => state.tasks.dayTasks); // Получаем задания за текущее число
  let month;

  // Удаляем 0 из порядкового номера месяца, если он начинается на ноль (01, 02 и т.д.)
  if (calendarDate.month && calendarDate.month.length > 1) {
    month = +calendarDate.month[1];
  }

  // Получаем текущую дату по календарю в нужном формате
  const choosenDate = `${calendarDate.day} ${months[month]} ${calendarDate.year}`;

  return (
    <div className={style.taskListWrap}>
      {currentDayNotes.length ? <h2 className={style.taskListTitle}>Задания на {choosenDate} года </h2> : null}
      <div className={style.listWrap}>
        <div className={style.taskList}>
          {
            currentDayNotes.length ? currentDayNotes.map(task => (
              <TasksItem 
                key={task.id}
                text={task.taskText}
                id={task.id}
                completed={task.completed}
              />
            )) : <h2 className={style.taskListTitle}>Заданий на {choosenDate} года нет</h2>
          }
        </div>
      </div>
    </div>
  );
}
