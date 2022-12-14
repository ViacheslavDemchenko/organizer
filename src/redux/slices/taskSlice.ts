import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getTasksFromLS } from '../../utils';

type Task = {
  id: number,
  completed: boolean,
  taskText: string
};

type CalendarDate = {
  day: string,
  month: string,
  year: string
};

type TasksInitialState = {
  tasks: Task[],
  dayTasks: Task[],
  calendarDate: CalendarDate,
  editMode: boolean,
  editTask: string,
  editTaskId: number
};

const initialState: TasksInitialState = {
  tasks: getTasksFromLS(),
  dayTasks: [],
  calendarDate: {},
  editMode: false,
  editTask: '',
  editTaskId: 0
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    calendarDateOnChange(state, action: PayloadAction<CalendarDate>) {
      state.calendarDate = action.payload;
      const year = action.payload.year;
      const month = action.payload.month;
      const day = action.payload.day;

      if (state.tasks.hasOwnProperty(year) && state.tasks[year].hasOwnProperty(month) && state.tasks[year][month].hasOwnProperty(day)) {
        state.dayTasks = state.tasks[year][month][day];
      } else {
        state.dayTasks = [];
      }
    },
    addNewTask(state, action: PayloadAction<Task>) {
      if (!state.editMode) {
        const year = state.calendarDate.year;
        const month = state.calendarDate.month;
        const day = state.calendarDate.day;
  
        const newTask = {
          id: action.payload.id,
          taskText: action.payload.taskText,
          completed: action.payload.completed
        };
  
        if (!state.tasks.hasOwnProperty(year)) {
          state.tasks[year] = {};
        } 
  
        if (!state.tasks[year].hasOwnProperty(month)) {
          state.tasks[year][month] = {};
        }
  
        if (state.tasks.hasOwnProperty(year) && state.tasks[year].hasOwnProperty(month) && state.tasks[year][month].hasOwnProperty(day)) {
          state.tasks[year][month][day].push(newTask);
        } else {
          state.tasks[year][month][day] = [];

          state.tasks[year][month][day].push(newTask);
        }
  
        const currentCalendarDate = `${state.calendarDate.year}-${state.calendarDate.month}-${state.calendarDate.day}`;

        const currentFormDate = `${state.calendarDate.year}-${state.calendarDate.month}-${state.calendarDate.day}`;
  
        if (currentCalendarDate === currentFormDate) {
          state.dayTasks = state.tasks[year][month][day];
        } 
      } else {
        const newDayTasks = state.dayTasks.map(el => {
          if(el.id === state.editTaskId) {
              return {
                ...el,
                taskText: action.payload.taskText
              }
          } else {
              return el;
          }
        });

        state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = newDayTasks;

        state.dayTasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];

        state.editMode = false;
      }
    },
    completeTask(state, action: PayloadAction<Task>) {
      const newDayTasks = state.dayTasks.map(el => {
        if(el.id === action.payload.id) {
            return {
              ...el,
              completed: !el.completed
            }
        } else {
            return el;
        }
    });

    state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = newDayTasks;

    state.dayTasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];
    },
    deleteTask(state, action: PayloadAction<Task>) {
      const currentDateTasks = state.dayTasks;
      const filteredDayTasks = currentDateTasks.filter((obj) => obj.id !== action.payload.id);

      state.dayTasks = filteredDayTasks;

      state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day] = state.dayTasks;

      if (state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day].length === 0) {
        delete state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];
      }

      if (Object.keys(state.tasks[state.calendarDate.year][state.calendarDate.month]).length === 0) {
        delete state.tasks[state.calendarDate.year][state.calendarDate.month];
      }

      if (Object.keys(state.tasks[state.calendarDate.year]).length === 0) {
        delete state.tasks[state.calendarDate.year];
      }
    },
    editTask(state, action: PayloadAction<Task>) {
      state.editMode = true;
      const tasks = state.tasks[state.calendarDate.year][state.calendarDate.month][state.calendarDate.day];

      state.tasks.map(task => {
        if (task.id === action.payload.id) {
          state.editTask = task.taskText;
          state.editTaskId = task.id;
        }
      });
    }
  }
});

export const { addNewTask, completeTask, deleteTask, calendarDateOnChange, editTask } = tasksSlice.actions;

export default tasksSlice.reducer;