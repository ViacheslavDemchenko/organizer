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
    let month = date.getMonth() + 1; // Получаем месяц
    let day = date.getDate(); // Получаем день

    // Добавляем 0 ко дню для 1-10 числа
    if (day < 10) {
      day = '0' + day;
    }

    // Получаем дату в виде строки день, месяц (словом) и год для вывода в компонент со списком заданий на текущую дату
    setCurrentDate(`${day} ${months[month - 1]} ${year} года`);
  }, []);

  useEffect(() => {
    setNotes(notesList);
  }, [notes]);

  // Показываем задания за выбраное число с помощью callback-функции
  const onChange = useCallback(
    (date) => {
      setDate(date); // Устанавливаем дату
      const year = date.getFullYear(); // Получаем год
      const month = date.getMonth() + 1; // Получаем месяц
      let day = date.getDate(); // Получаем день

      // Добавляем 0 ко дню для 1-10 числа
      if (day < 10) {
        day = '0' + day;
      }

      // Получаем выбранную дату в виде строки день, месяц (словом) и год для вывода в компонент со списком заданий
      setCurrentDate(`${day} ${months[month - 1]} ${year} года`);

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
    let month = date.getMonth() + 1; // Получаем месяц
    let day = date.getDate(); // Получаем день

    // Добавляем 0 ко дню для 1-10 числа
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

  // Добавление нового задания
  const addTask = (id, taskText, currentDate) => {
    const newTaskDay = currentDate.split('-'); // Разбиваем указанную в форме дату на массив
    const year = newTaskDay[0]; // Берем первый элемент массива (год)
    const month = newTaskDay[1].substr(1); // Берем второй элемент массива (месяц)
    let day = newTaskDay[2]; // Берем третий элемент массива (день)

    // Создаем новое задание
    const task = {
      id,
      taskText,
      completed: false
    };

    // Если объект для выбранного в форме года еще не существует в объекте списка заданий, то создаем пустой объект
    if (!notes.hasOwnProperty(year)) {
      notes[year] = {};
    } 

    // Если объект для выбранного в форме месяца еще не существует в объекте списка заданий, то создаем пустой объект
    if (!notes[year].hasOwnProperty(month)) {
      notes[year][month] = {};
    }

    // Если год, месяц и число существуют в объекте списка заданий
    if (notes.hasOwnProperty(year) && notes[year].hasOwnProperty(month) && notes[year][month].hasOwnProperty(day)) {

      // Получаем список (массив) заданий за это число
      const currentDayTasks = notes[year][month][day];

      // Помещаем в массив заданий за это число новое задание
      const currentDayAddTask = currentDayTasks.push(task);

      // Добавляем список заданий за указанное число в общий список заданий
      setNotes([...notes[year][month][day], currentDayAddTask]);

      console.log(date.toISOString().split('T')[0]);
      console.log(currentDate);

      // Если дата, указанная в форме (число в которое добавлялось новое задание) соответтсвует текущей дате календаря,
      // то обновляем на экране и список текущих заданий за это число
      if (date.toISOString().split('T')[0] === currentDate) {
        setDayTasks(notes[year][month][day]);
      }

    } else {
      // Если указанная в форме дата (день) не существует, то задаемее в виде пустого массива
      notes[year][month][day] = [];

      // Получаем этот массив
      const currentDayTasks = notes[year][month][day];

      // Помещаем в массив заданий за это число новое задание
      const currentDayAddTask = currentDayTasks.push(task);

      // Добавляем список заданий за указанное число в общий список заданий
      setNotes([...notes[year][month][day], currentDayAddTask]);

      console.log(date.toISOString().split('T')[0]);
      console.log(currentDate);

      // Если дата, указанная в форме (число в которое добавлялось новое задание) соответтсвует текущей дате календаря,
      // то обновляем на экране и список текущих заданий за это число
      if (date.toISOString().split('T')[0] === currentDate) {
        setDayTasks(notes[year][month][day]);
      }
    }
    console.log(notes);
  };

  const completeTask = (id) => {
    let year = date.getFullYear(); // Получаем год
    let month = date.getMonth() + 1; // Получаем месяц
    let day = date.getDate(); // Получаем день

    // Добавляем 0 ко дню для 1-10 числа
    if (day < 10) {
      day = '0' + day;
    }

    const newDayTasks = dayTasks.map(el => {
      if(el.id === id) {
        return {
            ...el,
            completed: !el.completed
        }
      } else {
          return el;
      }
    });

    // Обновляем список заданий на выбранный день
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
            addTask={addTask} 
          />
        </div>
          <TasksList 
            currentDate={currentDate}
            dayTasks={dayTasks}
            deleteTask={deleteTask}
            completeTask={completeTask}
          />
      </div>
    </div>
  );
}

export default App;