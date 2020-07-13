import React, { useState, useEffect } from 'react';
import axios from 'axios';

import glass from '../images/glass.svg';
import { Input } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/uploadArticle';

const { Search } = Input;

const SearchComponent = () => {
  const [news, setNews] = useState('');

  const API_URL = 'http://10.2.50.231:5000/article/search/content';
  useEffect(() => {
    axios.get(API_URL).then(response => {
      setNews(response.data);
      console.log(response.data);
    });
  }, []);

  return (
    <Container className="search-component">
      <Search
        placeholder="What are you looking for?"
        onSearch={value => console.log(value)}
        enterButton
      />
    </Container>
  );
};

export default SearchComponent;
