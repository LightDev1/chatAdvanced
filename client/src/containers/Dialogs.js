import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { dialogActions } from '../redux/actions';
import { Dialogs as BaseDialogs } from 'components';

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filtered, setFiltered] = useState(Array.from(items));

    const onChangeInput = (event) => {
        const value = event.target.value;

        setFiltered(
            items.filter(dialog => dialog.user.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0)
        );
        setSearchValue(value);
    };

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltered(items);
        }
    }, [fetchDialogs, items]);

    return <BaseDialogs
        userId={userId}
        items={filtered}
        onSearch={onChangeInput}
        inputValue={searchValue}
        onSelectDialog={setCurrentDialogId}
        currentDialogId={currentDialogId}
    />
};

export default connect(({ dialogs }) => dialogs, dialogActions)(Dialogs);