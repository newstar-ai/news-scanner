import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
    Upload,
    Button,
    message,
    Form,
    Input,
    InputNumber,
    DatePicker,
    Row,
    Col,
    Layout,
    Menu
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';
import ArticlePublish from '../components/UploadArticle/ArticlePublish';

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

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

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const UploadArticle = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imgData, setImgData] = useState(null);

    const props = {
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: file => {
            setFileList([...fileList, file]);
            return false;
        },
        fileList
    };

    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('img', file);
        });

        setUploading(true);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        axios
            .post('http://10.2.50.231:5000/article/convert_text', formData, config)
            .then(response => {
                setFileList([]);
                setUploading(false);
                setImgData(response.data);
                message.success('upload successfully.');
            })
            .catch(error => {
                setUploading(false);
                console.log(error);
                message.error('upload failed.');
            });
    };

    return (
        <Container>
            <Wrapper>
                <Title>Upload Article</Title>
                <Upload {...props}>
                    <Button>
                        <UploadOutlined /> Select File
                    </Button>
                </Upload>
                <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{ marginTop: 16 }}
                >
                    {uploading ? 'Uploading' : 'Start Upload'}
                </Button>

                {imgData ? (
                    <ArticlePublish imgData={imgData} setUploading={setUploading} />
                ) : (
                    ''
                )}
            </Wrapper>
        </Container>
    );
};

export default UploadArticle;
