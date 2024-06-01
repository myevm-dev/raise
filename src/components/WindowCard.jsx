import React from 'react';

const WindowCard = ({ title, src }) => {
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
