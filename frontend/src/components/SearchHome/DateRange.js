import { DatePicker, Input } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
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

    const handleDateChange = (dates) => {
        console.log(dates)
        if (dates === null) {
            dates = [moment('2020-04-25'), moment()]
        }
        
        setDateRange([
            dates[0] ? dates[0].format('YYYY-MM-DD') : '2020-04-25',
            dates[1] ? dates[1].format('YYYY-MM-DD') : moment()
        ]);
        dispatch(setStartDate(dates[0] ? dates[0].format('YYYY-MM-DD') : '2020-04-25'));
        dispatch(setEndDate(dates[1] ? dates[1].format('YYYY-MM-DD') : moment()));
    };

    return (
        <Input.Group className="search-dateRange">
            <DatePicker.RangePicker
                defaultValue={dateRange}
                className="datePicker"
                onChange={e => handleDateChange(e)}
            />
        </Input.Group>
    );
};

export default DateRange;
