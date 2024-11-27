import React, { useState } from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel';
import './main.css';

function App() {
  const [showCharts, setShowCharts] = useState(true); // State to toggle chart visibility

  const toggleCharts = () => {
    setShowCharts(!showCharts); // Toggle between true and false
  };

  return (
    <div className="app-container">
      <DropDownPanel />
      <main>
        <Background />
        <LeftSidebar />
        <RightSidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
