import { createSlice } from '@reduxjs/toolkit';

const initialState = {

};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  newDayTasks: [],
  reducers: {
    completeTask(state, action) {
      const findTask = state.items.find(el => el.id === action.payload.id);

      if(findTask) {
        return {
            ...el,
            completed: action.payload
        }
      } else {
          return el;
      }
    }
  },
});

export default tasksSlice.reducer;