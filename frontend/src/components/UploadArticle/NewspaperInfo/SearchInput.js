import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Form, Input, Button,  Select } from 'antd';
import querystring from 'querystring';
import moment from 'moment';



const { Option } = Select;

let timeout;
let currentValue;
const SearchInput = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState(null);


    const fetch = (value, callback) => {
        if (timeout) {
            clearTimeout(timeout);
            timeout = null;
        }
        currentValue = value;

        const fake = () => {
            const str = querystring.encode({
                code: 'utf-8',
                q: value,
            });
            axios.get(`https://suggest.taobao.com/sug?${str}`)
                .then(response => response.json())
                .then(d => {
                    if (currentValue === value) {
                        const { result } = d;
                        const data = [];
                        result.forEach(r => {
                            data.push({
                                value: r[0],
                                text: r[0],
                            });
                        });
                        callback(data);
                    }
                });
        }

        timeout = setTimeout(fake, 300);
    }
 
    const handleSearch = value => {
        if (value) {
            fetch(value, data => setData(data));
        } else {
            setData([]);
        }
    };

    const handleChange = value => {
        setValue(value);
    };
    const options = data.map(d => <Option key={d.value}>{d.text}</Option>);


    return (
        <>

            <Select
                showSearch
                value={value}
                // placeholder={this.props.placeholder}
                // style={this.props.style}
                defaultActiveFirstOption={false}
                showArrow={false}
                filterOption={false}
                onSearch={handleSearch}
                onChange={handleChange}
                notFoundContent={null}
            >
                {options}
            </Select>
        </>
    );
};

export default SearchInput;
