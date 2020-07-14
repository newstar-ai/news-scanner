import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UploadOutlined } from '@ant-design/icons';
import glass from '../images/glass.svg';
import { Input } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/uploadArticle';

const { Search } = Input;

const SearchComponent = () => {
  const [news, setNews] = useState('');

  const API_URL =
    'https://cors-anywhere.herokuapp.com/http://10.2.50.231:5000/article/search/content';
  useEffect(() => {}, []);
  const handleSearch = () => {
    axios
      .post(
        API_URL,
        {
          content: 'muon'
        },
        { headers: { 'X-Requested-With': 'XMLHttpRequest' } }
      )
      .then(response => {
        console.log(response);
        setNews(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Container className="search-component">
      <Search
        placeholder="What are you looking for?"
        onSearch={handleSearch}
        enterButton
      />
      <UploadOutlined />
    </Container>
  );
};

export default SearchComponent;
