import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import SearchHome from '../components/SearchHome';

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
            <SearchHome />
        </div>
    </div>
);

export default Home;
