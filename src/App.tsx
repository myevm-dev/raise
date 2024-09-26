// App.tsx
import React from 'react';
import LeftSidebar from './components/LeftSidebar'; // Updated import
import RightSidebar from './components/RightSidebar';
import Carousel from './components/Carousel';
import WindowCard from './components/WindowCard';
import ArticleCard from './components/ArticleCard';
import Background from './components/Background';
import Footer from './components/Footer';
import DropDownPanel from './components/DropDownPanel';
import './main.css';

function App() {
  return (
    <div className="app-container">
      <DropDownPanel />
      <main>
        <Background />
        <LeftSidebar /> 
        <RightSidebar />
        <div className="content">
          <div className="window-row">
            <Carousel>
              <WindowCard
                title="weth/usdc chart"
                src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x88e6a0c2ddd26feeb64f039a2c41296fcb3f5640?theme=dark&chartType=1&chartResolution=1d&drawingToolbars=true"
              />
              <WindowCard
                title="wbtc/weth chart"
                src="https://www.dextools.io/widget-chart/en/arbitrum/pe-light/0x2f5e87c9312fa29aed5c179e456625d79015299c?theme=dark&chartType=1&chartResolution=1d&drawingToolbars=true"
              />
              <WindowCard
                title="link/weth chart"
                src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa6cc3c2531fdaa6ae1a3ca84c2855806728693e8?theme=dark&chartType=1&chartResolution=1d&drawingToolbars=true"
              />
              <WindowCard
                title="uni/weth chart"
                src="https://www.dextools.io/widget-chart/en/ether/pe-light/0x1d42064fc4beb5f8aaf85f4617ae8b3b5b8bd801?theme=dark&chartType=1&chartResolution=1d&drawingToolbars=true"
              />
              <WindowCard
                title="pepe/weth chart"
                src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa43fe16908251ee70ef74718545e4fe6c5ccec9f?theme=dark&chartType=1&chartResolution=1d&drawingToolbars=true"
              />
            </Carousel>
          </div>
          <div className="cards-row">
            <ArticleCard imgSrc="https://i.imgur.com/5uJQeo6.png" altText="Example Image 1" />
            <ArticleCard imgSrc="https://i.imgur.com/m9MDGBK.png" altText="Example Image 2" />
            <ArticleCard imgSrc="https://i.imgur.com/4dJlZ1q.png" altText="Example Image 3" />
            <ArticleCard imgSrc="https://i.imgur.com/p0t4nOy.png" altText="Example Image 4" />
            <ArticleCard imgSrc="https://i.imgur.com/xqL3Cqw.png" altText="Example Image 5" />
            <ArticleCard imgSrc="https://i.imgur.com/W1YHzkI.png" altText="Example Image 6" />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;