import React from 'react';

const ArticleCard = ({ imgSrc, altText }) => {
  return (
    <article className="article-card" data-glow>
      <img src={imgSrc} alt={altText} className="article-image" />
      <span data-glow />
    </article>
  );
};

export default ArticleCard;
