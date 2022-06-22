import { EntityId } from "@reduxjs/toolkit"

interface TaskBoardProps {
	boardId: EntityId;
}

// Displays a board with all its relative tasks
function TaskBoard({boardId}: TaskBoardProps) {
	return (
		<div>
			{boardId}
		</div>
	)
}

export default TaskBoard
