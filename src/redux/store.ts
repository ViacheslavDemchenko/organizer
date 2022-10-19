import { configureStore } from '@reduxjs/toolkit';


import tasks from './slices/taskSlice.ts';

const store = configureStore({
  reducer: {
    tasks: tasks
  },

});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;