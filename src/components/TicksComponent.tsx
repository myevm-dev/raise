import React from 'react';
import styles from './TicksComponent.module.css';

interface TicksComponentProps {
  className?: string;
}

const TicksComponent: React.FC<TicksComponentProps> = ({ className }) => {
  const totalDivs = 101; // 50 for token0 and 50 for token1

  return (
    <div className={`${styles.wrap} ${className}`}>
      {Array.from({ length: totalDivs }).map((_, index) => {
        let divClass = styles.c;

        return <div key={index} className={divClass}></div>;
      })}
    </div>
  );
};

export default TicksComponent;