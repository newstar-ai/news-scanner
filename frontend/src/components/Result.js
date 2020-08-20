import React from 'react';
import { Card, Row, Col } from 'antd';
// import sgnews from '../images/sgnews.png';
import '../css/Result.css';
import LinesEllipsis from 'react-lines-ellipsis';
import { Link } from 'react-router-dom';

const Result = ({
  id,
  artTitle,
  artAuthor,
  artContent,
  artLink,
  pageNum,
  pubTitle,
  pubDate,
  newsTitle
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
          <Link to={`article/${id}`}>
            <h2 style={{ fontSize: 20, fontWeight: 600 }}>{artTitle}</h2>
          </Link>

          <h3>
            #{pageNum} - {pubTitle} - {newsTitle}
          </h3>
          <h3>{artAuthor} - 8/7/2020</h3>
          <p
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              fontSize: 16
            }}
          >
            {artContent}
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
