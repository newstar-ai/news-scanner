import { Card, Col, Row } from 'antd';
import Moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { Link } from 'react-router-dom';
// import sgnews from '../images/sgnews.png';
import '../css/Result.css';
import { useSelector } from 'react-redux';

const Result = ({
  id,
  title,
  author,
  content,
  link,
  pageNum,
  pubDate,
  newsTitle
}) => {
  const highlightText = useSelector(state => state.search.highlightText);

  return (
    <Card
      className="card-container"
      hoverable
      style={{ marginTop: 0, marginBottom: 10 }}
      bodyStyle={{ height: '100%' }}
    >
      <Link to={{ pathname: `article/${id}`, highlightText: highlightText }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>
          <Highlighter
            highlightClassName="hl-class"
            searchWords={[highlightText]}
            autoEscape={true}
            textToHighlight={title}
          />
        </h2>
      </Link>

      <h3>
        #{pageNum} - {Moment(pubDate).format('DD MMM YYYY')} - {newsTitle}
      </h3>
      <h3>
        {/* {artAuthor} */}
        <Highlighter
          highlightClassName="hl-class"
          searchWords={[highlightText]}
          autoEscape={true}
          textToHighlight={author}
        />
      </h3>
      <p className="card-content">
        <Highlighter
          highlightClassName="hl-class"
          searchWords={[highlightText]}
          autoEscape={true}
          textToHighlight={content}
        />
      </p>
    </Card>
  );
};

export default Result;
