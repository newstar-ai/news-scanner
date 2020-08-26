import React from 'react';
import { Card, Row, Col } from 'antd';
// import sgnews from '../images/sgnews.png';
import '../css/Result.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';
import Highlighter from "react-highlight-words";
import Moment from "moment";

const Result = ({
  id,
  artTitle,
  artAuthor,
  artContent,
  artLink,
  pageNum,
  pubDate,
  newsTitle,
  searchInput
}) => {
  return (
    <Card
      className="item"
      hoverable
      style={{ width: '100%' }}
      bodyStyle={{ height: '100%' }}
    >
      <Row style={{ height: '100%' }}>
        <Col span={20}>
          <Link to={{pathname: `article/${id}`, searchInput: searchInput}}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>
              <Highlighter
                highlightClassName="hl-class"
                searchWords={[searchInput]}
                autoEscape={true}
                textToHighlight={artTitle}
              />  
            </h2>
          </Link>

          <h3>
            #{pageNum} - {Moment(pubDate).format("DD MMM YYYY")} - {newsTitle}
          </h3>
          <h3>
            {/* {artAuthor} */}
            <Highlighter
                highlightClassName="hl-class"
                searchWords={[searchInput]}
                autoEscape={true}
                textToHighlight={artAuthor}
            />
          </h3>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 16
            }}
          >
            {/* {artContent} */}
            <Highlighter
                highlightClassName="hl-class"
                searchWords={[searchInput]}
                autoEscape={true}
                textToHighlight={artContent}
            />
          </p>
        </Col>
        <Col span={4}>
          {/* <img src={`//${artLink}`} alt="News" style={{ width: '100%' }} /> */}
        </Col>
      </Row>
    </Card>
  );
};

export default Result;
