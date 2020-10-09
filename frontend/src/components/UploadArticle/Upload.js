import {
    Button,
    message,
    Upload
} from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Title = styled.h1`
  color: black;
  font-size: 2.5rem;
  font-weight: 700;
`;

const UploadScreen = () => {
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
                message.success('Upload successfully.');
            })
            .catch(error => {
                setUploading(false);
                console.log(error);
                message.error('Upload failed.');
            });
    };

    return (
        <>
            <Title>Upload Article</Title>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">
Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
Support for a single or bulk upload. Strictly prohibit from
uploading unrelated data or other sensitive files
                </p>
            </Dragger>

            <Button
                type="primary"
                onClick={handleUpload}
                disabled={fileList.length === 0}
                loading={uploading}
                style={{ marginTop: 16 }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>
        </>
    )
}

export default UploadScreen;