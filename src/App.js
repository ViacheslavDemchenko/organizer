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
    setNotes(notesList); // Получаем начальный список заданий
    setDate(date); // Устанавливаем сегодняшнюю дату
    let year = date.getFullYear(); // Получаем год
    let month = date.getMonth(); // Получаем месяц
    let day = date.getDate(); // Получаем день

    // Получаем дату в виде строки день, месяц (словом) и год для вывода в компонент со списком заданий на текущую дату
    setCurrentDate(`${day} ${months[month]} ${year} года`);
  }, []);

  // Показываем задания за выбраное число с помощью callback-функции
  const onChange = useCallback(
    (date) => {
      setDate(date); // Устанавливаем дату
      const year = date.getFullYear(); // Получаем год
      const month = date.getMonth(); // Получаем месяц
      let day = date.getDate(); // Получаем день

      // Получаем выбранную дату в виде строки день, месяц (словом) и год для вывода в компонент со списком заданий
      setCurrentDate(`${day} ${months[month]} ${year} года`);

      // Добавляем 0 ко дню, так как в объекте с заданиями дни идут двухзначные (01, 02 и т.д.)
      if (day < 10) {
        day = '0' + day;
      }

      // Проверяем, если в списке заданий есть выбранный в календаре год, месяц и день
      if (notes.hasOwnProperty(year) && notes[year].hasOwnProperty(month) && notes[year][month].hasOwnProperty(day)) {
        setDayTasks(notes[year][month][day]); // то получаем задания на этот день 
      } else {
        setDayTasks({}); // если нет, то очищаем список заданий на этот день
      }

    }, [notes],
  );

  // Удаление заданий по id
  const deleteTask = (id) => {
    let year = date.getFullYear(); // Получаем год
    let month = date.getMonth(); // Получаем месяц
    let day = date.getDate(); // Получаем день

     // Добавляем 0 ко дню, так как в объекте с заданиями дни идут двухзначные (01, 02 и т.д.)
    if (day < 10) {
      day = '0' + day;
    }

    // Удаляем элемент из списка заданий на выбранный день
    const newDayTasks = dayTasks.filter(el => el.id !== id);
    setDayTasks(newDayTasks);

    // Заменяем массив с заданиями за выбранный день в общем списке заданий
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