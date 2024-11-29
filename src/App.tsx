// App.tsx
import React from 'react';
import LeftSidebar from './components/LeftSidebar';
import RightSidebar from './components/RightSidebar';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel';
import NFTCarousel from './components/NFTCarousel';
import './main.css';

function App() {
  return (
    <div className="app-container">
      <DropDownPanel />
      <Background />
      <main>
        <LeftSidebar />

        <div className="main-content">
        
            <div className="nft-carousel-wrapper">
              <NFTCarousel />
            </div>

        </div>

        <RightSidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
