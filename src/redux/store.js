import { configureStore } from '@reduxjs/toolkit';
import calendar from './calendar/slice';

export const store = configureStore({
  reducer: {
    calendar
  },
});
