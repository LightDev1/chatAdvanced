import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import socket from 'core/socket';
import { dialogActions } from '../redux/actions';
import { Dialogs as BaseDialogs } from 'components';

const Dialogs = ({ fetchDialogs, currentDialogId, setCurrentDialogId, items, userId }) => {
    const [searchValue, setSearchValue] = useState('');
    const [filtered, setFiltered] = useState(Array.from(items));

    const onChangeInput = (event) => {
        const value = event.target.value;

        setFiltered(
            items.filter(dialog =>
                dialog.author.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                dialog.partner.fullname.toLowerCase().indexOf(value.toLowerCase()) >= 0
            )
        );
        setSearchValue(value);
    };

    const onNewDialog = () => {
        fetchDialogs();
    }

    useEffect(() => {
        setFiltered(items);
    }, [items]);

    useEffect(() => {
        if (!items.length) {
            fetchDialogs();
        } else {
            setFiltered(items);
        }

        socket.on('SERVER:DIALOG_CREATED', onNewDialog);

        return () => {
            socket.remove('SERVER:DIALOG_CREATED', onNewDialog);
        };
        // eslint-disable-next-line
    }, []);

    return <BaseDialogs
        userId={userId}
        items={filtered}
        onSearch={onChangeInput}
        inputValue={searchValue}
        currentDialogId={currentDialogId}
        onSelectDialog={setCurrentDialogId}
    />
};

export default connect(({ dialogs }) => dialogs, dialogActions)(Dialogs);