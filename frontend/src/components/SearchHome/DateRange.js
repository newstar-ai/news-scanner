import { DatePicker, Input } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEndDate, setStartDate } from '../../actions';
import '../../css/Search.css';

const DateRange = () => {
  const { startDate, endDate } = useSelector(state => state.search);
  const [dateRange, setDateRange] = useState([
    startDate ? moment(startDate) : null,
    endDate ? moment(endDate) : null
  ]);

  const dispatch = useDispatch();

  const handleDateChange = dates => {
    setDateRange([
      dates[0] ? dates[0].format('YYYY-MM-DD') : null,
      dates[1] ? dates[1].format('YYYY-MM-DD') : null
    ]);
    dispatch(setStartDate(dates[0] ? dates[0].format('YYYY-MM-DD') : null));
    dispatch(setEndDate(dates[1] ? dates[1].format('YYYY-MM-DD') : null));
  };

  return (
    <Input.Group compact className="search-dateRange">
      <div className="dateRange-title">Date range</div>
      <DatePicker.RangePicker
        defaultValue={dateRange}
        style={{ width: '100%' }}
        onChange={handleDateChange}
      />
    </Input.Group>
  );
};

export default DateRange;
