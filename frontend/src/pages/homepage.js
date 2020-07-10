import React from 'react';
import styled from 'styled-components';
import Search from '../components/Search';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    font-family: 'Open Sans', sans-serif;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 500px;
    height: 40%;
`;

const Title = styled.h1`
    color: black;
    font-size: 2.5rem;
    font-weight: 700;
`;

const Homepage = () => (
    <Container>
        <Wrapper>
            <Title>
                Homepage <br/>
                News Scanner
            </Title>
            <Search />
        </Wrapper>
    </Container>
);

export default Homepage;
