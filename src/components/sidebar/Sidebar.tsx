import { EntityId } from "@reduxjs/toolkit"

import AddBoardMenu from "../../views/boards/AddBoardMenu";
import BoardsList from "../../views/boards/BoardsList"

interface SidebarProps {
	selectedBoardId: EntityId;
	selectBoard: (id: EntityId) => void;
}

// Displays the side menu
function Sidebar({selectedBoardId, selectBoard}: SidebarProps) {
	return (
		<div className="flex flex-col px-8 h-full w-80 bg-slate-400">
			{/* Sidebar Title */}
			<div className="h-20 flex items-center">
				<span className="text-3xl font-bold">
					{/* Logo goes here */}
					Task Manager
				</span>
			</div>

			{/* Main sidebar content */}
			<div className="grow flex flex-col gap-4">
				<BoardsList selectedBoardId={selectedBoardId} selectBoard={selectBoard}/>

				<AddBoardMenu/>
			</div>
		</div>
	)
}

export default Sidebar
