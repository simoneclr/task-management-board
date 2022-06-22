import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { EntityId } from '@reduxjs/toolkit';

import { selectAllBoardsIds } from './store/boards/boardsSlice';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import TaskBoard from './views/boards/TaskBoard';

function App() {

  const boardsIds = useSelector(selectAllBoardsIds)

  const [selectedBoardId, setSelectedBoardId] = useState<EntityId>(boardsIds[0])

  const selectBoard = (id: EntityId): void => {
    setSelectedBoardId(id)
  }

  return (
    <div className="h-screen flex">

      <Sidebar selectedBoardId={selectedBoardId} selectBoard={selectBoard}/>
      
      <main className='grow'>
        <Navbar boardId={selectedBoardId}/>

        <TaskBoard boardId={selectedBoardId}/>
      </main>
    </div>
  );
}

export default App;
