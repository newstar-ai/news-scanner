import { Col, Input, Row } from 'antd';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setHighlightText,
  setSearchText,
  setSearchFilter
} from '../../actions';
import '../../css/Search.css';
import { Container } from '../../pages/create';
import Result from './Result';
import DateRange from './DateRange';
import FilterSearch from './FilterSearch';
import { searchFilterOptions } from '../../reducers/search';

const SearchHome = () => {
  const dispatch = useDispatch();

  const { searchText, searchFilter, startDate, endDate } = useSelector(
    state => state.search
  );

  const [news, setNews] = useState([]);
  const [searchInput, setSearchInput] = useState(searchText);
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const handleSearchChange = e => {
    setSearchInput(e.target.value);
    dispatch(setSearchText(e.target.value));
  };

  const getSearch = async () => {
    setLoading(true);
    dispatch(setHighlightText(searchInput));
    dispatch(setSearchFilter(checkedList));
    let requestOptions = {
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

  const onCheckChange = checkedList => {
    setCheckedList(checkedList);
  };

  const onCheckAllChange = () => {
    setCheckedList(searchFilterOptions);
  };

  return (
    <Container className="search-component">
      <Row>
        <Col span={14}>
          <Input
            placeholder="What are you looking for?"
            value={searchInput}
            onChange={handleSearchChange}
            className="searchBar"
          />
        </Col>
        <Col span={9}>
          <DateRange />
        </Col>
        <Col span={1} onClick={getSearch}>
          <div className="search-button-container">
            <SearchOutlined />
          </div>
        </Col>
      </Row>
      <div className="searchOption">
        <FilterSearch
          checkedList={checkedList}
          onCheckChange={onCheckChange}
          onCheckAllChange={onCheckAllChange}
        />
      </div>
      <Result data={news} loading={loading} />
    </Container>
  );
};

export default SearchHome;
