import React from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
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

const UploadArticle = () => (
  <Container>
    <Wrapper>
      <Title>Upload Article</Title>
      <Search />
    </Wrapper>
  </Container>
);

export default UploadArticle;
