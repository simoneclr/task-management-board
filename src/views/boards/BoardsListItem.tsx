import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

import { selectBoardById } from "../../store/boards/boardsSlice";

interface BoardsListItemProps {
	boardId: EntityId;
	selectedBoardId: EntityId;
	selectBoard: (id: EntityId) => void;
}

function BoardsListItem({boardId, selectedBoardId, selectBoard}: BoardsListItemProps) {

	const board = useSelector((state: RootState) => selectBoardById(state, boardId))

	const activeClassName = "text-blue-500 font-bold "

	return (
		board ?
		
		<li onClick={e => selectBoard(boardId)}
			className={(selectedBoardId === boardId ? activeClassName : "") + 
				"cursor-pointer p-2 bg-slate-200 rounded-sm hover:bg-slate-500"}>
			{board.name}
		</li>

		:

		null
	)
}

export default BoardsListItem