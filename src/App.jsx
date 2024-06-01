import React from 'react';
import NavBar from './components/NavBar';
import RightSidebar from './components/RightSidebar';
import Carousel from './components/Carousel';
import WindowCard from './components/WindowCard';
import ArticleCard from './components/ArticleCard';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel'; // Import the DropDownPanel component
import './main.css';

function App() {
  return (
    <div className="app-container">
      <DropDownPanel /> {/* Add the DropDownPanel component here */}
      <main>
        <Background />
        <NavBar />
        <RightSidebar />
        <div className="content">
          <div className="window-row">
            <Carousel>
              <WindowCard title="weth/usdc chart" src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640?theme=dark&chartType=1&chartResolution=60&drawingToolbars=true" />
              <WindowCard title="wbtc/weth chart" src="https://www.dextools.io/widget-chart/en/arbitrum/pe-light/0x2f5e87c9312fa29aed5c179e456625d79015299c?theme=dark&chartType=1&chartResolution=60&drawingToolbars=true" />
              <WindowCard title="link/weth chart" src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8?theme=dark&chartType=1&chartResolution=60&drawingToolbars=true" />
              <WindowCard title="uni/weth chart" src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801?theme=dark&chartType=1&chartResolution=60&drawingToolbars=true" />
              <WindowCard title="pepe/weth chart" src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa43fe16908251ee70ef74718545e4fe6c5ccec9f?theme=dark&chartType=1&chartResolution=60&drawingToolbars=true" />
            </Carousel>
          </div>
          <div className="cards-row">
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
            <ArticleCard />
          </div>
        </div>
      </main>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
