import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Steps } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import Title from 'antd/lib/typography/Title';
import UploadNewsPage from '../components/UploadArticle/UploadNewsPage';
import NewspaperInfo from '../components/UploadArticle/NewspaperInfo';
import CropScreen from '../components/UploadArticle/CropScreen';
import '../css/create.css';

const { Step } = Steps;

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
    const [current, setCurrent] = useState(0);

    const steps = [
        {
            title: 'Upload',
            content: <UploadNewsPage />,
        },
        {
            title: 'Newspaper Info',
            content: <NewspaperInfo />,
        },
        {
            title: 'Crop',
            content: <CropScreen />,
        },
        {
            title: 'Label',
            content: 'Last-content',
        }
    ];

    const next = () => {
        setCurrent( current + 1);
    };

    const prev = () => {
        setCurrent( current - 1 );
    };

    return (
        <Container>
            <Wrapper>
                <Title className="title">Create Article</Title>
                <Steps current={current}>
                    {steps.map(item => (
                        <Step key={item.title} title={item.title} />
                    ))}
                </Steps>
                <div className="steps-content">{steps[current].content}</div>
                <div className="steps-action">
                    {current > 0 && (
                        <Button style={{ margin: '0 8px', marginLeft: 0 }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button type="primary" onClick={() => next()}>
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
          
                </div>

            </Wrapper>
        </Container>
    );
};

export default Create;
