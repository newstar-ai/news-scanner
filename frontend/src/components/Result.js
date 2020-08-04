import React from 'react';
import { Card, Row, Col } from 'antd';
import sgnews from '../images/sgnews.png';
import '../css/Result.css';

const Result = ({ artTitle, artAuthor, artContent, artLink, pageNum, pubTitle, pubDate, newsTitle, }) => {
    return (
        <Card
            className="item"
            hoverable
            style={{ width: '100%' }}>
            <Row>
                <Col span={20}>
                    <h2><b>{artTitle}</b></h2>
                    <h3>#{pageNum} - {pubTitle} - {newsTitle}</h3>
                    <h3>{artAuthor} - 8/7/2020</h3>
                    <p>{artContent}</p>
                </Col>
                <Col span={4}>
                    <img src={sgnews} alt="News" />
                </Col>
            </Row>
        </Card>
    );
};

export default Result;

