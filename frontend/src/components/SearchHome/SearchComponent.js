import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { Input, Radio, Card, DatePicker } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/create';
import Result from './Result';


const { Search } = Input;

const SearchComponent = () => {
    const [news, setNews] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [searchOption, setSearchOption] = useState('content');
    const [dateRange, setDateRange ] = useState([]);
    const [loading, setLoading] = useState(true);
    
    let requestOptions = {};

    const options = [
        { label: 'title', value: 'title' },
        { label: 'author', value: 'author' },
        { label: 'content', value: 'content' }
    ];

    const handleSearchChange = e => {
        setSearchInput(`${e.target.value}`);
    };

    const handleRequest = e => {
        setSearchOption(e.target.value);
    };

    const handleDateChange = e => {
        setDateRange([Moment(e[0]._d).format('YYYY-MM-DD'), Moment(e[1]._d).format('YYYY-MM-DD')])
    }

    //   const getAll = () => {
    //     axios
    //       .get(`http://10.2.50.231:5000/article/get_all`)
    //       .then(response => {
    //         console.log(response.data.hits.hits);
    //         setLoading(false);
    //         setNews(response.data.hits.hits);
    //       })
    //       .catch(error => {
    //         console.log(error);
    //       });
    //   };

    const getSearch = async () => {
        setLoading(true);
        requestOptions = {
            [searchOption]: ` ${searchInput} `,
            'start_date': dateRange[0] ? dateRange[0] : '',
            'end_date': dateRange[1] ? dateRange[1] : ''
        }
        const response = await axios.post(
            `http://10.2.50.231:5000/article/search/${searchOption}`,
            requestOptions
        );
        console.log(response.data.hits.hits);
        setLoading(false);
        setNews(response.data.hits.hits);
    };

    //   useEffect(() => {
    //     getAll();
    //   }, []);

    return (
        <Container className="search-component">
            <Search
                placeholder="What are you looking for?"
                value={searchInput}
                onChange={handleSearchChange}
                onSearch={getSearch}
            />
            <div>Search by</div>
            <div className="searchOption">
                <Radio.Group
                    options={options}
                    value={searchOption}
                    onChange={handleRequest}
                />
                <Input.Group 
                    compact
                    className="search-daterange"
                >
                    <div className="daterange-title">Date range</div>
                    <DatePicker.RangePicker 
                        style={{ width: '100%' }} 
                        onChange={handleDateChange}/>
                </Input.Group>
            </div>
            <Card
                loading={loading}
                bordered={false}
                style={{ width: '100%' }}
                className="result"
            >
                {news.length > 0
                    ? news.map(item => (
                        <Result
                            key={item._id}
                            id={item._id}
                            artTitle={item._source.article_info.article_title}
                            artAuthor={item._source.article_info.article_author}
                            artContent={item._source.article_info.article_content}
                            artLink={item._source.article_info.article_url_web}
                            pubTitle={item._source.publication_info.publication_title}
                            pageNum={item._source.publication_info.page_num}
                            newsTitle={item._source.newspaper_info.newspaper_title}
                            searchInput={searchInput}
                        />
                    ))
                    : 'Not Found'}
            </Card>
        </Container>
    );
};

export default SearchComponent;
