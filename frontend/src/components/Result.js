import { Card } from 'antd';
import Moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import sgnews from '../images/sgnews.png';
import '../css/Result.css';

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
    const { highlightText, searchFilter } = useSelector(state => state.search);

    return (
        <Card
            className="card-container"
            hoverable
            style={{ marginTop: 0, marginBottom: 10 }}
            bodyStyle={{ height: '100%' }}
        >
            <Link to={{ pathname: `article/${id}`}}>
                <h2 style={{ fontSize: 20, fontWeight: 600 }}>
                    <Highlighter
                        highlightClassName="hl-class"
                        searchWords={searchFilter.includes('title') ? [highlightText] : []}
                        textToHighlight={title}
                        autoEscape
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
                    searchWords={searchFilter.includes('author') ? [highlightText] : []}
                    textToHighlight={author}
                    autoEscape
                />
            </h3>
            <p className="card-content">
                <Highlighter
                    highlightClassName="hl-class"
                    searchWords={searchFilter.includes('content') ? [highlightText] : []}
                    textToHighlight={content}
                    autoEscape
                />
            </p>
        </Card>
    );
};

export default Result;
