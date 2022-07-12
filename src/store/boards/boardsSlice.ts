import { createEntityAdapter, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";

import { TaskBoard } from "../../model/tasksTypes";

const boardsAdapter = createEntityAdapter<TaskBoard>({})

const boardsSlice = createSlice({
	name: "boards",
	initialState: boardsAdapter.getInitialState(),
	reducers: {
		boardAdded: {
			reducer: (
				state, 
				action: PayloadAction<{
					name: string
				}>
			) => {
				const {name} = action.payload

				const newBoard: TaskBoard = {
					id: nanoid(),
					name
				}

				boardsAdapter.addOne(state, newBoard)
			},
			prepare: (name: string) => {
				return {
					payload: {
						name
					}
				}
			} 
		}
	}
})

export default boardsSlice.reducer

export const {
	boardAdded
} = boardsSlice.actions

export const {
	selectIds: selectAllBoardsIds,
	selectById: selectBoardById
} = boardsAdapter.getSelectors((state: RootState) => state.boards)
