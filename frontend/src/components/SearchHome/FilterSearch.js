import { Button, Checkbox, Popover } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchFilter } from '../../actions';
import { searchFilterOptions } from '../../reducers/search';

const CheckboxGroup = Checkbox.Group;

const FilterSearch = () => {
  const searchFilter = useSelector(state => state.search.searchFilter);
  const dispatch = useDispatch();
  const [checkedList, setCheckedList] = useState(searchFilter);
  const [openPopover, setOpenPopover] = useState(false);

  useEffect(() => {
    if (checkedList.length === 0) {
      setCheckedList(searchFilterOptions);
    }
  }, [checkedList]);

  const onChange = checkedList => {
    setCheckedList(checkedList);
  };

  const saveFilter = () => {
    setOpenPopover(false);
    dispatch(setSearchFilter(checkedList));
  };
  const handleOpenPopover = status => {
    setOpenPopover(status);
  };

  const content = (
    <div>
      <CheckboxGroup
        options={searchFilterOptions}
        value={checkedList}
        onChange={onChange}
      />
      <Button onClick={saveFilter}>Save</Button>
    </div>
  );

  return (
    <>
      Search by
      <Popover
        placement="bottomRight"
        content={content}
        trigger="click"
        visible={openPopover}
        onVisibleChange={handleOpenPopover}
      >
        <Button>
          {checkedList.length === 3 ? 'All' : checkedList.join(', ')}
        </Button>
      </Popover>
    </>
  );
};

export default FilterSearch;
