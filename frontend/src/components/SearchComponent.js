import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Input, Radio, Card } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/uploadArticle';
import Result from './Result';

const { Search } = Input;

const SearchComponent = () => {
    const [news, setNews] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchOption, setSearchOption] = useState('content');
    const [loading, setLoading] = useState(true);
    const requestOptions = {};

    const options = [
        { label: 'title', value: 'title' },
        { label: 'author', value: 'author' },
        { label: 'content', value: 'content' },
    ];

    const updateSearch = e => {
        setSearchInput(e.target.value);
    };

    const handleRequest = (e) => {
        setSearchOption(e.target.value);
    };

    const getAll = () => {
        axios
            .get(`http://10.2.50.231:5000/article/get_all`)
            .then(response => {
                console.log(response.data.hits.hits);
                setLoading(false);
                setNews(response.data.hits.hits);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const getSearch = async () => {

        setLoading(true);
        requestOptions[searchOption] = searchInput;

        const response = await axios.post(`http://10.2.50.231:5000/article/search/${searchOption}`, requestOptions);
        console.log(response.data.hits.hits);
        setLoading(false);
        setNews(response.data.hits.hits);
    };

    useEffect(() => {
        getAll();
    }, []);

    return (
        <Container className="search-component">
            <Search
                placeholder="What are you looking for?"
                value={searchInput}
                onChange={updateSearch}
                onSearch={getSearch}
            />
            <div className="searchOption">
				Search by
                <Radio.Group
                    options={options}
                    value={searchOption}
                    onChange={handleRequest}
                />
            </div>
            <Card loading={loading} bordered={false} style={{ width: '100%'}} className="result">
                {news.map(item => (
                    <Result
                        key={item._id}
                        artTitle={item._source.article_info.article_title}
                        artAuthor={item._source.article_info.article_author}
                        artContent={item._source.article_info.article_content}
                        artLink={item._source.article_info.article_url_local}
                        pubTitle={item._source.publication_info.publication_title}
                        pageNum={item._source.publication_info.page_num}
                        newsTitle={item._source.newspaper_info.newspaper_title}
                    />
                ))}
            </Card>
        </Container>
    );
};

export default SearchComponent;
