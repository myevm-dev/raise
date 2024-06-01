import React, { useState } from 'react';

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + children.length) % children.length);
  };

  return (
    <div className="carousel">
      <button className="carousel-button prev" onClick={prevSlide}>◀</button>
      <div className="carousel-content">
        {React.Children.map(children, (child, index) => (
          <div className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
            {child}
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>▶</button>
    </div>
  );
};

export default Carousel;
