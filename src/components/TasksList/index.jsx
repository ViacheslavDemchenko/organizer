import React from 'react';
import { TasksItem } from './../TasksItem';

import style from './TaskList.module.scss';

export const TasksList = ({currentDate, dayTasks, deleteTask, completeTask}) => {
  return (
    <div className={style.taskListWrap}>
      {dayTasks.length ? <h2 className={style.taskListTitle}>Задания на {currentDate}</h2> : null}
      <div className={style.listWrap}>
        <div className={style.taskList}>
          {
            dayTasks.length ? dayTasks.map(task => (
              <TasksItem 
                key={task.id}
                text={task.taskText}
                id={task.id}
                completed={task.completed}
                deleteTask={deleteTask}
                completeTask={completeTask}
              />
            )) : <h2 className={style.taskListTitle}>Заданий на {currentDate} нет</h2>
          }
        </div>
      </div>
    </div>
  );
}
