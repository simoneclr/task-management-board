import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { getMockTasks } from '../util/mockData';

import tasksSlice from './tasks/tasksSlice';

export const store = configureStore({
  reducer: {
    tasks: tasksSlice,
  },
  preloadedState: {
    tasks: getMockTasks()
  }
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
