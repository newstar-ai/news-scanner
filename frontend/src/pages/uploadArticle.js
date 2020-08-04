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

const { TextArea } = Input;
const { Header, Content, Footer } = Layout;

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

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
    const [form] = Form.useForm();

    useEffect(() => {
        console.log(fileList);
    });

    const props = {
        onRemove: file => {
            console.log(file);
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

        console.log(formData);
        setUploading(true);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };

        axios
            .post('http://10.2.50.231:5000/article/convert_text', formData, config)
            .then(response => {
                console.log(response);
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

    const onFinish = values => {
        const obj = {
            article_info: {
                article_title: values.article_title,
                article_author: values.article_author,
                article_content: values.article_content,
                article_url_local: imgData.local_url
            },
            publication_info: {
                publication_title: values.publication_title,
                page_num: values.page_num
            },
            newspaper_info: {
                newspaper_title: values.newspaper_title
            }
        };
        axios
            .post('http://10.2.50.231:5000/article/upload/', obj)
            .then(response => {
                console.log(response);
                setUploading(false);
                message.success('upload article successfully.');
                window.location.replace('/');
            })
            .catch(error => {
                setUploading(false);
                console.log(error);
                message.error('upload article failed.');
            });
    };

    const onReset = () => {
        form.resetFields();
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
                  {/* article_title */}
                  <Form.Item
                    name="article_title"
                    label="Article Title"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* page_num */}
                  <Form.Item
                    name="page_num"
                    label="Page Number"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <InputNumber />
                  </Form.Item>

                  {/* publication_title */}
                  <Form.Item
                    name="publication_title"
                    label="Publication Title"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  {/* newspaper_title */}
                  <Form.Item
                    name="newspaper_title"
                    label="Newspaper Title"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                                    {/* article_title */}
                                    <Form.Item
                                        name="article_title"
                                        label="Article Title"
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>

                  {/* date_pulished */}

                  <Form.Item
                    name="date_pulished"
                    label="Date Pulished"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <DatePicker
                      defaultValue={moment()}
                      format={dateFormatList}
                    />{' '}
                  </Form.Item>

                  {/* article_content */}

                  <Form.Item
                    name="article_content"
                    label="Article Content"
                    rules={[
                      {
                        required: true
                      }
                    ]}
                  >
                    <TextArea rows={10} />
                  </Form.Item>
                                    <Form.Item
                                        name="article_content"
                                        label="Article Content"
                                        rules={[
                                            {
                                                required: true
                                            }
                                        ]}
                                    >
                                        <TextArea rows={4} />
                                    </Form.Item>

                                    <Form.Item
                                        // {...tailLayout}
                                    >
                                        <Button type="primary" htmlType="submit">
											Submit
                                        </Button>
                                        <Button
                                            style={{ marginLeft: 16 }}
                                            htmlType="button"
                                            onClick={onReset}
                                        >
											Reset
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                ) : (
                    ''
                )}
            </Wrapper>
        </Container>
    );
};

export default UploadArticle;
