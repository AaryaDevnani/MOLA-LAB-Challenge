import React from "react";
import "./styles/article.css";

function Article({ Title, Collaborators, Year, Journal, bib, key }) {
  return (
    <div key={key}>
      <a className="article-title">{Title}</a>
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
