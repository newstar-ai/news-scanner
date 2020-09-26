import axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react';
import Highlighter from 'react-highlight-words';
import { useSelector } from 'react-redux';
import '../css/article.css';

const Article = props => {
    const [article, setArticle] = useState(null);
    const { highlightText, searchFilter } = useSelector(state => state.search);

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
    }, [props.match.params.id]);

    return (
        <div className="article">
            {article ? (
                <>
                    <img
                        src={`//${article.article_info.article_url_web}`}
                        alt="Article"
                        style={{ height: '100%', objectFit: 'cover', width: '100%' }}
                    />
                    <h2 style={{ fontSize: 24 }}>
                        <Highlighter
                            highlightClassName="hl-class"
                            searchWords={searchFilter.includes('title') ? [highlightText] : []}
                            autoEscape
                            textToHighlight={article.article_info.article_title}
                        />
                    </h2>
                    <h3>
            #{article.publication_info.page_num} -{' '}
                        {Moment(article.publication_info.publish_date).format(
                            'DD MMM YYYY'
                        )}{' '}
            - {article.newspaper_info.newspaper_title}
                    </h3>
                    <h3>
            Tác giả:
                        <Highlighter
                            highlightClassName="hl-class"
                            searchWords={searchFilter.includes('author') ? [highlightText] : []}
                            autoEscape
                            textToHighlight={article.article_info.article_author}
                        />
                    </h3>
                    <h3>Số từ: {article.article_info.words_count}</h3>
                    <hr />
                    <p>
                        <Highlighter
                            highlightClassName="hl-class"
                            // searchWords={["gia"]}
                            searchWords={searchFilter.includes('content') ? [highlightText] : []}
                            autoEscape
                            textToHighlight={article.article_info.article_content}
                        />
                    </p>
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default Article;
