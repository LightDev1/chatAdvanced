import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import socket from 'core/socket';
import { messagesActions } from '../redux/actions';
import { Messages as BaseMessages } from 'components';

const Messages = ({ currentDialogId, user, fetchMessages, addMessage, items, isLoading }) => {
    const messagesRef = useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    }

    useEffect(() => {
        if (currentDialogId) {
            fetchMessages(currentDialogId);
        }

        socket.on('MESSAGES:NEW_MESSAGE', onNewMessage);

        return () => {
            socket.removeListener('MESSAGES:NEW_MESSAGE', onNewMessage);
        };
        // eslint-disable-next-line
    }, [currentDialogId, fetchMessages]);

    useEffect(() => {
        messagesRef.current.scrollTo(0, 999999);
    }, [items]);

    return <BaseMessages
        user={user}
        blockRef={messagesRef}
        items={items}
        isLoading={isLoading}
    />
};

export default connect(
    ({ dialogs, messages, user }) => ({
        currentDialogId: dialogs.currentDialogId,
        items: messages.items,
        isLoading: messages.isLoading,
        user: user.data,
    }),
    messagesActions
)(Messages);