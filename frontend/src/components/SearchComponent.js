import React, { useState } from 'react';
import axios from 'axios';
import Moment from 'moment';
import { Input, Radio, Select, DatePicker } from 'antd';
import '../css/Search.css';
import { Container } from '../pages/create';
import Result from './Result';
import FilterSearch from './FilterSearch';
import { useSelector, useDispatch } from 'react-redux';
import {
  setSearchText,
  setStartDate,
  setEndDate,
  setNews,
  setHighlightText
} from '../actions';

const { Search } = Input;
const { Option } = Select;

const SearchComponent = () => {
  const searchText = useSelector(state => state.search.searchText);
  const searchFilter = useSelector(state => state.search.searchFilter);
  const startDate = useSelector(state => state.search.startDate);
  const endDate = useSelector(state => state.search.endDate);
  const [news, setNews] = useState(null);

  const dispatch = useDispatch();

  const [searchInput, setSearchInput] = useState(searchText);
  // const [dateRange, setDateRange] = useState([
  //   Moment().subtract(5, 'months'),
  //   Moment()
  // ]);
  const [loading, setLoading] = useState(false);
  let requestOptions = {};

  const handleSearchChange = e => {
    setSearchInput(e.target.value);
    dispatch(setSearchText(e.target.value));
  };

  const handleDateChange = e => {
    dispatch(setStartDate(Moment(e[0]._d).format('YYYY-MM-DD')));
    dispatch(setEndDate(Moment(e[1]._d).format('YYYY-MM-DD')));
  };

  const getSearch = async () => {
    setLoading(true);
    dispatch(setHighlightText(searchInput));
    requestOptions = {
      keyword: searchInput,
      search_fields: {
        content: searchFilter.includes('content'),
        title: searchFilter.includes('title'),
        author: searchFilter.includes('author')
      },
      start_date: startDate,
      end_date: endDate
    };

    const response = await axios.post(
      `http://10.2.50.231:5000/article/search`,
      requestOptions
    );

    setLoading(false);
    setNews(response.data.hits.hits);
  };

  return (
    <Container className="search-component">
      <Search
        placeholder="What are you looking for?"
        value={searchInput}
        onChange={handleSearchChange}
        onSearch={getSearch}
      />
      <div className="searchOption">
        <FilterSearch />
        <Input.Group compact className="search-daterange">
          <div className="daterange-title">Date range</div>
          <DatePicker.RangePicker
            defaultValue={[startDate, endDate]}
            style={{ width: '100%' }}
            onChange={handleDateChange}
          />
        </Input.Group>
      </div>
      {!loading && news ? (
        <>
          <h3 style={{ fontWeight: 600 }}>{news.length} kết quả</h3>
          {news.length > 0
            ? news.map(item => (
                <Result
                  key={item._id}
                  id={item._id}
                  title={item._source.article_info.article_title}
                  author={item._source.article_info.article_author}
                  content={item.showed_content}
                  link={item._source.article_info.article_url_web}
                  pubDate={item._source.publication_info.publish_date}
                  pageNum={item._source.publication_info.page_num}
                  newsTitle={item._source.newspaper_info.newspaper_title}
                />
              ))
            : 'not found'}
        </>
      ) : loading ? (
        'loading'
      ) : (
        ''
      )}
    </Container>
  );
};

export default SearchComponent;
