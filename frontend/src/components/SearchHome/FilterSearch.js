import { Button, Checkbox, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '../../actions';
import { searchFilterOptions } from '../../reducers/search';

const CheckboxGroup = Checkbox.Group;

const FilterSearch = () => {
    const dispatch = useDispatch();
    const searchFilter = useSelector(state => state.search.searchFilter);

    const [checkedList, setCheckedList] = useState(searchFilter);

    const onChange = checkedList => {
        setCheckedList(checkedList);
        dispatch(setSearchFilter(checkedList));
    };
  
    const onCheckAllChange = () => {
        setCheckedList(searchFilterOptions);
        dispatch(setSearchFilter(searchFilterOptions));
    };

    // const [checkedList, setCheckedList] = useState(searchFilter);
    // const [openPopover, setOpenPopover] = useState(false);

    // useEffect(() => {
    //     if (checkedList.length === 0) {
    //         setCheckedList(searchFilterOptions);
    //     }
    // }, [checkedList]);

    // const onChange = checkedList => {
    //     setCheckedList(checkedList);
    // };

    // const saveFilter = () => {
    //     setOpenPopover(false);
    //     dispatch(setSearchFilter(checkedList));
    // };
    // const handleOpenPopover = status => {
    //     setOpenPopover(status);
    // };

    // const content = (
    //     <div>
    //         <CheckboxGroup
    //             options={searchFilterOptions}
    //             value={checkedList}
    //             onChange={onChange}
    //         />
    //         <Button onClick={saveFilter}>Save</Button>
    //     </div>
    // );

    return (
        <>
            <h3>Search by</h3>
            {/* <Popover
                placement="bottomRight"
                content={content}
                trigger="click"
                visible={openPopover}
                onVisibleChange={handleOpenPopover}
            >
                <Button>
                    {checkedList.length === 3 ? 'All' : checkedList.join(', ')}
                </Button>
            </Popover> */}
            <div className="site-checkbox-all-wrapper">
            </div>
            <CheckboxGroup
                options={searchFilterOptions}
                value={checkedList}
                onChange={onChange}
            />
            <Button onClick={onCheckAllChange}>Check all</Button>
        </>
    );
};

export default FilterSearch;
