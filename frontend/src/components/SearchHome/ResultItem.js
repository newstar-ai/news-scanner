import { List } from 'antd';
import Moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import sgnews from '../images/sgnews.png';
import '../../css/Result.css';
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
            <Highlighter
              highlightClassName="hl-class"
              searchWords={
                searchFilter.includes('title') ? [highlightText] : []
              }
              textToHighlight={title}
              autoEscape
            />
          </Link>
        }
        description={
          <>
            <p>
              #{pageNum} - {Moment(pubDate).format('DD MMM YYYY')} - {newsTitle}
              <br></br>
              <Highlighter
                highlightClassName="hl-class"
                searchWords={
                  searchFilter.includes('author') ? [highlightText] : []
                }
                textToHighlight={author}
                autoEscape
              />
            </p>
          </>
        }
      />
      <Highlighter
        highlightClassName="hl-class"
        searchWords={searchFilter.includes('content') ? [highlightText] : []}
        textToHighlight={content}
        autoEscape
      />
    </List.Item>
  );
};

export default ResultItem;
