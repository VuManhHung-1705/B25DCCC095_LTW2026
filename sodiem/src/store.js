import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './features/coursesSlice';
import goalReducer from './features/goalSlice';
import { loadSaved, saveCourses } from './storage';

const saved = loadSaved();
export const hasSaved = saved !== null;

export const store = configureStore({
  reducer: { courses: coursesReducer, goal: goalReducer },
  preloadedState: { courses: saved ?? [] },
});

let previous = store.getState().courses;
store.subscribe(() => {
  const current = store.getState().courses;
  if (current !== previous) {
    previous = current;
    saveCourses(current);
  }
});

export default store;
