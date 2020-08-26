import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchComponent from '../components/SearchComponent';

import '../css/home.css';

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const Home = () => (
  <div className="home">
    <Title>
      <a href="/">News Scanner</a>
    </Title>
    <div className="container">
      <SearchComponent />
      <Link to="/create">Upload</Link>
    </div>
  </div>
);

export default Home;
