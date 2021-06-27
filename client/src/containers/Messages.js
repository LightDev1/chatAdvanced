import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { messagesActions } from '../redux/actions';
import { Messages as BaseMessages } from 'components';

const Messages = ({ currentDialogId, fetchMessages, items }) => {
    useEffect(() => {
        fetchMessages(currentDialogId);
    }, [currentDialogId, fetchMessages]);

    return <BaseMessages
        items={items}
    />
};

export default connect(({ messages }) => messages, messagesActions)(Messages);