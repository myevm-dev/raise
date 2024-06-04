import React from 'react';
import './TicksComponent.css';

interface TicksComponentProps {
  className?: string;
}

const TicksComponent: React.FC<TicksComponentProps> = ({ className }) => {
  const totalDivs = 101;

  return (
    <div className={`wrap ${className}`}>
      {Array.from({ length: totalDivs }).map((_, index) => {
        let divClass = 'c';
        if (index < 50) {
          divClass += ' left';
        } else if (index === 50) {
          divClass += ' middle';
        } else {
          divClass += ' right';
        }
        return <div key={index} className={divClass}></div>;
      })}
    </div>
  );
};

export default TicksComponent;
