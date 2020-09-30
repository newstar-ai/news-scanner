import React from 'react';
import {
    Button,
    Checkbox
} from 'antd';
import { searchFilterOptions } from '../../reducers/search';


const CheckboxGroup = Checkbox.Group;

const FilterSearch = ({ checkedList, onCheckChange, onCheckAllChange }) => {
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
                onChange={onCheckChange}
            />
            <Button onClick={onCheckAllChange}>Check all</Button>
        </>
    );
};

export default FilterSearch;
