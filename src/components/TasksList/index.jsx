import React from 'react';
import { TasksItem } from './../TasksItem';

import style from './TaskList.module.scss';

export const TasksList = ({currentDate, tasks, deleteTask}) => {
  return (
    <div className={style.taskListWrap}>
      {tasks.length ? <h2 className={style.taskListTitle}>Задания на {currentDate}</h2> : null}
      <div className={style.listWrap}>
        <div className={style.taskList}>
          {
            tasks.length ? tasks.map(task => (
              <TasksItem 
                key={task.id}
                text={task.taskText}
                deleteTask={deleteTask}
                id={task.id}
                // fulfillTask={fulfillTask}
                // fulfilled={task.fulfilled}
              />
            )) : <h2 className={style.taskListTitle}>Заданий на {currentDate} нет</h2>
          }
        </div>
      </div>
    </div>
  );
}
