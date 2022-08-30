import { React, useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';

import 'react-calendar/dist/Calendar.css';
import './App.scss';
import { notesList } from './assets/notesList';

import { TasksList } from './components/TasksList';
import { Form } from './components/Form';

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

function App() {
  const [date, setDate] = useState(new Date()); // Сегодняшняя дата
  const [notes, setNotes] = useState(true); // Общий список дел
  const [currentDate, setCurrentDate] = useState(); // Выбранная дата в формате число, месяц (текстом), год
  const [dayTasks, setDayTasks] = useState({}); // Список дел на выбранную дату

  useEffect(() => {
    setNotes(notesList);
    setDate(date);
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    setCurrentDate(`${day} ${months[month]} ${year} года`);
  }, []);

  const onChange = useCallback(
    (date) => {
      setDate(date);
      const year = date.getFullYear();
      const month = date.getMonth();
      let day = date.getDate();
      setCurrentDate(`${day} ${months[month]} ${year} года`);

      if (day < 10) {
        day = '0' + day;
      }

      if (notes.hasOwnProperty(year) && notes[year].hasOwnProperty(month) && notes[year][month].hasOwnProperty(day)) {
        setDayTasks(notes[year][month][day]);
      } else {
        setDayTasks({});
      }

    }, [notes],
  );

  const deleteTask = (id) => {
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    if (day < 10) {
      day = '0' + day;
    }

    const newDayTasks = dayTasks.filter(el => el.id !== id);
    setDayTasks(newDayTasks);

    let newNotes = notes[year][month][day] = newDayTasks;
    setNotes(newNotes);
  };

  return (
    <div className="app">
      <div className="container">
        <div className="app__row">
          <div className="app__row-left">
            <h1 className="app__row-title">Выберите дату</h1>
            <div className="calendar-container">
              <Calendar 
                onChange={onChange} 
                value={date} 
              />
            </div>
          </div>
          <Form 
            // addTask={addTask} 
          />
        </div>
          <TasksList 
            currentDate={currentDate}
            tasks={dayTasks}
            // currentDateCalendar={currentDateCalendar} 
            deleteTask={deleteTask}
            // fulfillTask={fulfillTask}
          />
      </div>
    </div>
  );
}

export default App;