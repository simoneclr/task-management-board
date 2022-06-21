import React from 'react';

import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';

function App() {
  return (
    <div className="h-screen flex">

      <Sidebar/>
      
      <main className='grow'>
        <Navbar/>
      </main>
    </div>
  );
}

export default App;
