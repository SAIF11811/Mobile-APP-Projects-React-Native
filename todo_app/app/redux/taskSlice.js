import { createSlice } from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push({ id: Date.now(), text: action.payload, completed: false, archived: false });
    },
    toggleTaskComplete: (state, action) => {
      const t = state.find(i => i.id === action.payload);
      if (t) t.completed = !t.completed;
    },
    archiveTask: (state, action) => {
      const t = state.find(i => i.id === action.payload);
      if (t) t.archived = true;
    },
    restoreTask: (state, action) => {
      const t = state.find(i => i.id === action.payload);
      if (t) t.archived = false;
    },
    deleteTask: (state, action) => {
      return state.filter(i => i.id !== action.payload);
    },
  },
});

export const { addTask, toggleTaskComplete, archiveTask, restoreTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
