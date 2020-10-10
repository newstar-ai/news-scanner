import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, DatePicker, Button, Checkbox } from 'antd';
import SearchInput from './SearchInput';
import moment from 'moment';



const NewspaperInfo = () => {
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    function onDateChange(date, dateString) {
        console.log(date, dateString);
    }



    return (
        <>
            <Form
                name="basic"
                layout="vertical"
                initialValues={{  }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Newspaper Title"
                    name="newspaper_title"
                    rules={[{ required: true, message: 'Please input your newspaper title!' }]}
                >
                    <SearchInput />
                </Form.Item>

                <Form.Item
                    label="Publish_date"
                    name="publish_date"
                    rules={[{ required: true, message: 'Please input your publish date!' }]}
                >
                    <DatePicker defaultValue={moment()} onChange={onDateChange} />
                </Form.Item>

                {/* <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item> */}
            </Form>
        </>
    );
};

export default NewspaperInfo;
