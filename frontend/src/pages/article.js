import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Highlighter from "react-highlight-words";
import '../css/article.css'

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Article = props => {
  const [article, setArticle] = useState(null);

  useEffect(() => {
    axios
      .get(`http://10.2.50.231:5000/article/get/${props.match.params.id}`)
      .then(response => {
        console.log(response);
        // setLoading(false);
        setArticle(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="article">
      {article ? (
        <>
          <img
            src={`//${article.article_info.article_url_web}`}
            alt="Article"
            style={{ height: "100%", objectFit: 'cover', width: '100%' }}
          />
          <h2 style={{ fontSize: 24 }}>
            <Highlighter
              highlightClassName="hl-class"
              searchWords={[props.location.searchInput]}
              autoEscape={true}
              textToHighlight={article.article_info.article_title}
            />
          </h2>
          <h3>
            #{article.publication_info.page_num} -{' '}
            {article.publication_info.publication_title} -{' '}
            {article.newspaper_info.newspaper_title}
          </h3>
          <h3>Tác giả: 
            <Highlighter
              highlightClassName="hl-class"
              searchWords={[props.location.searchInput]}
              autoEscape={true}
              textToHighlight={article.article_info.article_author}
            />
          </h3>
          <hr />
          {console.log(props.location.searchInput)}
          <Highlighter
            highlightClassName="hl-class"
            // searchWords={["gia"]}
            searchWords={[props.location.searchInput]}
            autoEscape={true}
            textToHighlight={article.article_info.article_content}
          />
          <p>{article.article_info.article_content}</p>
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default Article;