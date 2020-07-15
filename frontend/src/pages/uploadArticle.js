import React, { useState } from 'react';
import styled from 'styled-components';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

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

const UploadArticle = () => {
  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  const props = {
    onRemove: file => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: file => {
      setFileList([...fileList, file]);
      this.setState(state => ({
        fileList: [...state.fileList, file]
      }));
      return false;
    },
    fileList
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
          // onClick={handleUpload}
          disabled={fileList.length === 0}
          loading={uploading}
          style={{ marginTop: 16 }}
        >
          {uploading ? 'Uploading' : 'Start Upload'}
        </Button>
      </Wrapper>
    </Container>
  );
};

export default UploadArticle;
