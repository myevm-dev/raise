import React, { useEffect } from 'react';
import './TickerComponent.css';

const TickerComponent: React.FC = () => {
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js"]'
    );
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-ticker-tape.js';
      script.async = true;
      script.innerHTML = JSON.stringify({
        symbols: [
          { description: 'ETHUSD', proName: 'COINBASE:ETHUSD' },
          { description: 'APEUSD', proName: 'COINBASE:APEUSD' },
          { description: 'ARBUSD', proName: 'COINBASE:ARBUSD' },
          { description: 'PEPEUSD', proName: 'PYTH:PEPEUSD' },
          { description: 'LINKUSD', proName: 'COINBASE:LINKUSD' },
          { description: 'UNIUSD', proName: 'COINBASE:UNIUSD' },
          { description: 'BTCUSD', proName: 'COINBASE:BTCUSD' },
          { description: 'USDTUSDC', proName: 'COINBASE:USDTUSDC' }
        ],
        showSymbolLogo: true,
        isTransparent: true,
        displayMode: 'adaptive',
        colorTheme: 'dark',
        locale: 'en'
      });
  
      const container = document.getElementById('tradingview-widget-container');
      container?.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" id="tradingview-widget-container"></div>
  );
};

export default TickerComponent;