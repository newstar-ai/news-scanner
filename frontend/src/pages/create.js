import React, { useState } from 'react';
import styled from 'styled-components';
import ArticlePublish from '../components/UploadArticle/ArticlePublish';
import CropScreen from '../components/Create/CropScreen';
import UploadScreen from '../components/UploadArticle/Upload';

export const Container = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
`;

const Create = () => {
    const [step, setStep] = useState(1)

    return (
        <Container>
            <Wrapper>
                {step === 1 
                ? <UploadScreen />
                : step === 2 
                ? <CropScreen imgData={imgData}/>
                : <ArticlePublish imgData={imgData} setUploading={setUploading} />
                }
            </Wrapper>
        </Container>
    );
};

export default Create;
