import React, { useState } from 'react';
import { Dialogs as BaseDialogs } from 'components';

const Dialogs = ({ items, userId }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filtered, setFiltered] = useState(Array.from(items));

    const onChangeInput = (event) => {
        const value = event.target.value;

        setFiltered(
            items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
        );
        setSearchValue(value);
    };

    return <BaseDialogs
        userId={userId}
        items={filtered}
        onSearch={onChangeInput}
        inputValue={searchValue}
    />
};

export default Dialogs;