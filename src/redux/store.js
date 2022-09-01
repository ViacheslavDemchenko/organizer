import { configureStore } from '@reduxjs/toolkit';
import calendar from './calendar/slice';
import form from './form/slice';

export const store = configureStore({
  reducer: {
    calendar,
    form
  },
});
