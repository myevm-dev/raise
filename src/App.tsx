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
      <main className="main-container">
        <LeftSidebar />

        <div className="main-content">
          <NFTCarousel />

          {/* Card Row Beneath the Carousel */}
          <div className="card-row">
            {/* Your card components go here */}
          </div>
        </div>

        <RightSidebar />
      </main>
      <Footer />
    </div>
  );
}

export default App;
