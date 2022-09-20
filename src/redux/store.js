import { configureStore } from '@reduxjs/toolkit';
// import logger from 'redux-logger';

import tasks from './tasks/slice';

export const store = configureStore({
  reducer: {
    tasks: tasks
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(logger),
});
