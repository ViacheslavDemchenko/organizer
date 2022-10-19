import React, { useEffect, useRef } from 'react';
// import { useSelector } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { TasksItem } from '../TasksItem';

import style from './TaskList.module.scss';

const months: string[] = [
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

type Task = {
  id: number,
  completed: boolean,
  taskText: string
};

export const TasksList: React.FC = () => {
  const calendarDate = useAppSelector((state) => state.tasks.calendarDate);
  const currentDayNotes = useAppSelector((state) => state.tasks.dayTasks);
  const allTasks = useAppSelector((state) => state.tasks.tasks);
  const isMounted = useRef(false);
  let month: number;

  useEffect(() => {
    if (isMounted.current) {
      const json = JSON.stringify(allTasks);
      localStorage.setItem('tasks', json);
    } 
    isMounted.current = true;
  }, [allTasks]);

  if (calendarDate.month && calendarDate.month < 10) {
    month = +calendarDate.month[1];
  } else {
    month = calendarDate.month;
  }

  const choosenDate = `${calendarDate.day} ${months[month - 1]} ${calendarDate.year}`;

  return (
    <div className={style.taskListWrap}>
      {currentDayNotes.length ? <h2 className={style.taskListTitle}>Задания на {choosenDate} года </h2> : null}
      <div className={style.listWrap}>
        <div className={style.taskList}>
          {
            currentDayNotes.length ? currentDayNotes.map((task: Task) => (
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
