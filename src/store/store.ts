import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import boardsSlice from './boards/boardsSlice';
import tasksSlice from './tasks/tasksSlice';
import subTasksSlice from './subTasks/subTasksSlice';

import { getMockBoards, getMockSubTasks, getMockTasks } from '../util/mockData';

export const store = configureStore({
  reducer: {
    boards: boardsSlice,
    tasks: tasksSlice,
    subTasks: subTasksSlice
  },
  preloadedState: {
    boards: getMockBoards(),
    tasks: getMockTasks(),
    subTasks: getMockSubTasks()
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
