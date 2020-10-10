import { UploadOutlined } from '@ant-design/icons';
import { Button, message, Upload, Steps } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import ArticlePublish from './ArticlePublish';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;


export const Container = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
`;



const UploadNewsPage = () => {
    const [fileList, setFileList] = useState([]);
    const [uploading, setUploading] = useState(false);
    const [imgData, setImgData] = useState(null);


    const props = {
        multiple: true,
        onRemove: file => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
    
        beforeUpload: (file, listFiles) => {
            setFileList([...fileList].concat(listFiles));
            return false;
        },
        fileList
    };


    const handleUpload = () => {
        const formData = new FormData();
        fileList.forEach(file => {
            formData.append('files[]', file);
        });

        setUploading(true);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        console.log(formData);

    // axios
    //   .post('http://10.2.50.231:5000/article/convert_text', formData, config)
    //   .then(response => {
    //     setFileList([]);
    //     setUploading(false);
    //     setImgData(response.data);
    //     message.success('upload successfully.');
    //   })
    //   .catch(error => {
    //     setUploading(false);
    //     console.log(error);
    //     message.error('upload failed.');
    //   });
    };

    return (
        <>
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
                style={{ margin: '16px' }}
            >
                {uploading ? 'Uploading' : 'Start Upload'}
            </Button>

            {/* {imgData ? (
                <ArticlePublish imgData={imgData} setUploading={setUploading} />
            ) : (
                ''
            )} */}
        </>
    );
};

export default UploadNewsPage;
