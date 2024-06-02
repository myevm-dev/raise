import React, { useState, ReactNode } from 'react';

interface CarouselProps {
  children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + React.Children.count(children)) % React.Children.count(children));
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
