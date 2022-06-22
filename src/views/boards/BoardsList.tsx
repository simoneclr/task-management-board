import { EntityId } from "@reduxjs/toolkit"
import { useSelector } from "react-redux"

import { selectAllBoardsIds } from "../../store/boards/boardsSlice"

import BoardsListItem from "./BoardsListItem";

interface BoardsListProps {
	selectedBoardId: EntityId;
	selectBoard: (id: EntityId) => void;
}

// Displays a list of available boards
function BoardsList({selectedBoardId, selectBoard}: BoardsListProps) {

	const boardIds = useSelector(selectAllBoardsIds)

	return (
		<ul className="flex flex-col gap-2">
			{boardIds.map(id => 
				<BoardsListItem key={id} boardId={id} selectedBoardId={selectedBoardId} selectBoard={selectBoard}/>
			)}
		</ul>
	)
}

export default BoardsList
