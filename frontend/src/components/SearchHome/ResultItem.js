import { List } from 'antd';
import Moment from 'moment';
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import sgnews from '../images/sgnews.png';
import '../../css/Result.css';
import Highlight from '../Highlight';
const ResultItem = ({
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
        <List.Item
            style={{ padding: 0 }}
            key={id}
            extra={<img width={272} height={168} alt="logo" src={'http://' + link} />}
        >
            <List.Item.Meta
                // avatar={<Avatar src={item.avatar} />}
                title={
                    <Link to={{ pathname: `article/${id}` }}>
                        {/* <Highlighter
              highlightClassName="hl-class"
              searchWords={
                searchFilter.includes('title') ? [highlightText] : []
              }
              textToHighlight={title}
              autoEscape
            /> */}
                        <Highlight searchInput={
                            searchFilter.includes('title') ? highlightText : ''
                        }
                        text={title} />
                    </Link>
                }
                description={
                    <>
                        <p>#{pageNum} - {Moment(pubDate).format('DD MMM YYYY')} - {newsTitle}
                            <br></br>
                            <Highlight 
                                searchInput={
                                    searchFilter.includes('author') ? highlightText : ''
                                }
                                text={author}
                            />
                        </p>
                    </>
                }
            />
            <Highlight searchInput={
                searchFilter.includes('content') ? highlightText : ''
            }
            text={content} />
        </List.Item>
    );
};

export default ResultItem;
