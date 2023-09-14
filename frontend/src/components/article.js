import React from "react";
import "./styles/article.css";
function Article({ Title, Collaborators, Year, Journal, bib }) {
  return (
    <div>
      <p className="article-title">{Title}</p>
      <div className="article-meta">
        {Collaborators}. {Title}. ({Year})<i> {Journal}</i>
      </div>
      <a href={bib} className="bib">
        Bib
      </a>
    </div>
  );
}

export default Article;
