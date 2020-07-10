import React from 'react';
import styled from 'styled-components';
import Homepage from './pages/homepage';

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

const App = () => (
    <Container>
        <Wrapper>
            <Homepage />
        </Wrapper>
    </Container>
);

export default App;
