import { Card, List, Skeleton } from 'antd';
import React from 'react';
import '../../css/Result.css';
import ResultItem from './ResultItem';

const Result = ({ data, loading }) => {
  return (
    <List
      className="list-result"
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: page => {
          document.body.scrollTop = 0; // For Safari
          document.documentElement.scrollTop = 0;
        },
        pageSize: 5
      }}
      dataSource={data}
      renderItem={item => (
        <Card
          className="card-container"
          hoverable
          style={{ marginTop: 0, marginBottom: 10 }}
          bodyStyle={{ height: '100%' }}
        >
          <Skeleton loading={loading} active>
            <ResultItem
              key={item._id}
              id={item._id}
              title={item._source.article_info.article_title}
              author={item._source.article_info.article_author}
              content={item.showed_content}
              link={item._source.article_info.article_url_web}
              pubDate={item._source.publication_info.publish_date}
              pageNum={item._source.publication_info.page_num}
              newsTitle={item._source.newspaper_info.newspaper_title}
            />
          </Skeleton>
        </Card>
      )}
    />
  );
};

export default Result;
