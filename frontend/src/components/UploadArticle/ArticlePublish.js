import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Row
} from 'antd';
import axios from 'axios';
import Moment from 'moment';
import React, { Fragment } from 'react';
import styled from 'styled-components';

const { TextArea } = Input;

// const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

export const Container = styled.div`
  display: block;
  justify-content: center;
  width: 100%;
  font-family: 'Open Sans', sans-serif;
`;

const ArticlePublish = props => {
  const [form] = Form.useForm();

  console.log(props);
  const onFinish = values => {
    const obj = {
      article_info: {
        article_title: values.article_title,
        article_author: values.article_author,
        article_content: values.article_content,
        article_url_local: props.imgData.local_url,
        article_url_web: props.imgData.img_url
      },
      publication_info: {
        publish_date: Moment(values.publish_date._d).format('YYYY-MM-DD'),
        page_num: values.page_num
      },
      newspaper_info: {
        newspaper_title: values.newspaper_title
      }
    };

    axios
      .post('http://10.2.50.231:5000/article/upload/', obj)
      .then(response => {
        props.setUploading(false);
        message.success('upload article successfully.');
        window.location.replace('/');
      })
      .catch(error => {
        props.setUploading(false);
        console.log(error);
        message.error('upload article failed.');
      });
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <Fragment>
      <div style={{ marginTop: 32 }}>
        <Row gutter={16}>
          <Col span={12}>
            <img src={`http://${props.imgData.img_url}`} alt="" />
          </Col>
          <Col span={12}>
            <Form
              initialValues={{
                article_title: props.imgData.article_title,
                article_content: props.imgData.article_content
              }}
              layout="vertical"
              form={form}
              onFinish={onFinish}
            >
              {/* #1 newspaper_title */}
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

              {/* publish_date */}
              <Form.Item
                name="publish_date"
                label="Publish Date"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <DatePicker format="YYYY-MM-DD" />
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

              {/* article_author */}
              <Form.Item
                name="article_author"
                label="Article Author"
                rules={[
                  {
                    required: true
                  }
                ]}
              >
                <Input />
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
    </Fragment>
  );
};

export default ArticlePublish;
