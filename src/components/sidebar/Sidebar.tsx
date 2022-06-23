import { EntityId } from "@reduxjs/toolkit"
import BoardsList from "../../views/boards/BoardsList"

interface SidebarProps {
	selectedBoardId: EntityId;
	selectBoard: (id: EntityId) => void;
}

// Displays the side menu
function Sidebar({selectedBoardId, selectBoard}: SidebarProps) {
	return (
		<div className="flex flex-col px-8 h-full w-80 bg-slate-400">
			<div className="h-20 flex items-center">
				<span className="text-3xl font-bold">
					{/* Logo goes here */}
					Task Manager
				</span>
			</div>

			<BoardsList selectedBoardId={selectedBoardId} selectBoard={selectBoard}/>
		</div>
	)
}

export default Sidebar
