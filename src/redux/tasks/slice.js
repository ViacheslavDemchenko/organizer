import { createSlice } from '@reduxjs/toolkit';
import { getTasksFromLS } from '../../utils';

const initialState = {
  tasks: getTasksFromLS(), // Общий объект с заданиями
  dayTasks: [], // Массив заданий за выбранный день
  formDate: [], // Дата в форме в формате массива элементов (год, месяц, день)
  calendarDate: [], // Дата в календаре в формате массива элементов (год, месяц, день)
  editMode: false, // Режим редактирования задания
  editTask: '', // Текст выбранного для редактирования задания
  editTaskId: '' // Id выбранного для редактирования задания
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    calendarDateOnChange(state, action) {
      // Вносим новую дату в календарь
      state.calendarDate = action.payload;
      const year = action.payload.year; // Получаем из даты год
      const month = action.payload.month; // Получаем из даты месяц
      const day = action.payload.day; // Получаем из даты день

      // Если в стейте имеется полученный год, месяц и день, то передаем из него задания в список текущих за этот день для вывода на экран
      if (state.tasks.hasOwnProperty(year) && state.tasks[year].hasOwnProperty(month) && state.tasks[year][month].hasOwnProperty(day)) {
        state.dayTasks = state.tasks[year][month][day];
      } else {
        // В противном случае очищаем список заданий за текущий день
        state.dayTasks = [];
      }
    },
    formDateOnchange(state, action) {
      // Получаем новую дату в форме
      state.formDate = action.payload;
    },
    addNewTask(state, action) {
      // Проверяем, если режим редактирования отключен
      if (!state.editMode) {
        const year = state.formDate.year; // Получаем из даты в форме год
        const month = state.formDate.month; // Получаем из даты в форме месяц
        const day = state.formDate.day; // Получаем из даты в форме день
  
        // Создаем новое задание
        const newTask = {
          id: action.payload.id,
          taskText: action.payload.taskText,
          completed: action.payload.completed
        };
  
        // Если такого года нет в стейте заданий, то создаем его в виде пустого объекта
        if (!state.tasks.hasOwnProperty(year)) {
          state.tasks[year] = {};
        } 
  
        // Если такого месяца нет в таком году в стейте заданий, то создаем его в виде пустого объекта
        if (!state.tasks[year].hasOwnProperty(month)) {
          state.tasks[year][month] = {};
        }
  
        // Если такой год, месяц и день в стейте уже имеются, то вставляем новое задание в массив заданий за этот день
        if (state.tasks.hasOwnProperty(year) && state.tasks[year].hasOwnProperty(month) && state.tasks[year][month].hasOwnProperty(day)) {
          state.tasks[year][month][day].push(newTask);
        } else {
          // Если такого года, месяца и дня в стейте нет, то создаем пустой массив для заданий за этот день
          state.tasks[year][month][day] = [];

          // Помещаем в него новое задание
          state.tasks[year][month][day].push(newTask);
        }
  
        // Формируем текущую дату в календаре в нужном формате
        const currentCalendarDate = `${state.calendarDate.year}-${state.calendarDate.month}-${state.calendarDate.day}`;

        // Формируем текущую дату в форме в нужном формате
        const currentFormDate = `${state.formDate.year}-${state.formDate.month}-${state.formDate.day}`;
  
        // Если обе даты совпадают, то в список заданий за текущий день помещаем задания за это число из общего стейте заданий
        if (currentCalendarDate === currentFormDate) {
          state.dayTasks = state.tasks[year][month][day];
        } 
      } else {
        // Если режим редактирования активирован

        // Перебираем задания за текущий день
        const newDayTasks = state.dayTasks.map(el => {

          // Если id элемента в стейте выбранного для редактирования элемента соответствует с id редактируемого элемента 
          if(el.id === state.editTaskId) {
              return {
                ...el,
                taskText: action.payload.taskText // то меняем текст задания на новый
              }
          } else {
              return el;
          }
        });

        // Помещаем обновленный список заданий в общий стейт заданий за текущий день
        state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = newDayTasks;

        // Записываем обновленный список заданий в список за текущий день
        state.dayTasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];

        // Отключаем режим редактирования
        state.editMode = false;
      }
    },
    completeTask(state, action) {
      // Перебираем задания за текущий день
      const newDayTasks = state.dayTasks.map(el => {
        // Изменяем статус (выполнено / не выполнено) в нужном элементе по id
        if(el.id === action.payload) {
            return {
              ...el,
              completed: !el.completed
            }
        } else {
            return el;
        }
    });

    // Помещаем обновленный список заданий в общий стейт заданий за текущий день
    state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = newDayTasks;

    // Записываем обновленный список заданий в список за текущий день
    state.dayTasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];
    },
    deleteTask(state, action) {
      // Получаем список задания за текущий день
      const currentDateTasks = state.dayTasks;

      // Перебираем его и получаем нужный элемент по id
      const filteredDayTasks = currentDateTasks.filter((obj) => obj.id !== action.payload);

      // Помещаем обновленный список заданий в текущий день
      state.dayTasks = filteredDayTasks;

      // Помещаем обновленный список заданий в общий стейт заданий за текущий день
      state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = state.dayTasks;

      // Если после удаления очередного задания массив за текущее число стал путым, то удаляем его
      if (state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day].length === 0) {
        delete state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];
      }

      // Если после удаления очередного задания массив за текущий месяц стал путым, то удаляем его
      if (Object.keys(state.tasks[state.calendarDate.year][state.calendarDate.month]).length === 0) {
        delete state.tasks[state.calendarDate.year][state.calendarDate.month];
      }

      // Если после удаления очередного задания массив за текущий год стал путым, то удаляем его
      if (Object.keys(state.tasks[state.calendarDate.year]).length === 0) {
        delete state.tasks[state.calendarDate.year];
      }
    },
    editTask(state, action) {
      // Активируем режим редактирования задания
      state.editMode = true;

      // Получаем задания за текущий день
      const tasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];

      // Перебираем их и задаем в стейт текст и id выбранного задания
      tasks.map((task) => {
        if (task.id === action.payload) {
          state.editTask = task.taskText;
          state.editTaskId = task.id;
        }
      });
    }
  }
});

export const { addNewTask, formDate, completeTask, deleteTask, calendarDateOnChange, formDateOnchange, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;