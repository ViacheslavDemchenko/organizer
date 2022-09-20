import { React, useState, useCallback, useEffect } from 'react';
import Calendar from 'react-calendar';
import { useDispatch } from 'react-redux';
import { calendarDateOnChange, formDateOnchange } from './redux/tasks/slice';
import { dateFormatting } from './utils';

import 'react-calendar/dist/Calendar.css';
import './App.scss';

import { TasksList } from './components/TasksList';
import { Form } from './components/Form';

function App() {
  const [date, setDate] = useState(new Date()); // Сегодняшняя дата

  const dispatch = useDispatch();

  useEffect(() => {
    // Передаем в редакс начальную дату в форме в нужном формате
    dispatch(formDateOnchange(dateFormatting(date)));

    // Передаем в редакс начальную дату в календаре в нужном формате
    dispatch(calendarDateOnChange(dateFormatting(date)));
  
  }, []);

  // Отслеживание изменения даты с помощью callback-функции
  const onChange = useCallback(
    (date) => {
      setDate(date); // Устанавливаем выбранную дату

      // Передаем в редакс новую дату в календаре в нужном формате
      dispatch(calendarDateOnChange(dateFormatting(date)));
    }, [date],
  );
  
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
          <Form />
        </div>
          <TasksList />
      </div>
    </div>
  );
}

export default App;