import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  date: new Date(),
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  day: new Date().getDate(),
  notes: {}
};

const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    calendarOnChange(state, action) {
      if (state.day < 10) {
        state.day = '0' + state.day;
      }

      if (state.notes.hasOwnProperty(state.year) && state.notes[state.year].hasOwnProperty(state.month) && state.notes[state.year][state.month].hasOwnProperty(state.day)) {
        // setDayTasks(state.notes[year][month][day]);
        // setCurrentDateCalendar(`${day} ${months[month]} ${year} года`);
      } else {
        // setDayTasks({});
      }

    }
  },
});

export default calendarSlice.reducer;