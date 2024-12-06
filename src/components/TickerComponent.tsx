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
          { description: 'GRAILUSDT', proName: 'KUCOIN:GRAILUSDT' },
          { description: 'GNSUSDT', proName: 'BINANCE:GNSUSDT' },
          { description: 'ARBUSD', proName: 'COINBASE:ARBUSD' },
          { description: 'USDTUSDC', proName: 'COINBASE:USDTUSDC' },
          { description: 'BTCUSD', proName: 'COINBASE:BTCUSD' }
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