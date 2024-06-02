import React from 'react';

interface WindowCardProps {
  title: string;
  src: string;
}

const WindowCard: React.FC<WindowCardProps> = ({ title, src }) => {
  return (
    <article className="window-card" data-glow>
      <span data-glow />
      <iframe
        id="dextools-widget"
        title={title}
        width="1000"
        height="400"
        src={src}
      ></iframe>
    </article>
  );
};

export default WindowCard;
