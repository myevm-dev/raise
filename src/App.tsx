import React from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel';
import NFTCarousel from './components/NFTCarousel'; // Import your carousel
import './main.css';

function App() {
  return (
    <div className="app-container">
      <DropDownPanel />
      <main>
        <Background />
        <LeftSidebar />
        
        <div className="main-content">
          <NFTCarousel /> {/* Add the NFT carousel here */}
        </div>
        
        <RightSidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
