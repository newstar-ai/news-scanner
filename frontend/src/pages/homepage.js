import React from 'react';
import styled from 'styled-components';
import SearchComponent from '../components/SearchComponent';
import UploadArticle from './uploadArticle';
import { Link } from 'react-router-dom';

import '../css/homepage.css';

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Homepage = () => (
  <div className="homepage">
    <Title>
      <a href="/">News Scanner</a>
    </Title>
    <div className="container">
      <SearchComponent />
      <Upload />
    </div>
  </div>
);

export default Homepage;
