import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';

import socket from 'core/socket';
import { messagesActions } from '../redux/actions';
import { Messages as BaseMessages } from 'components';

const Messages = ({ currentDialogId, user, fetchMessages, addMessage, items, isLoading, removeMessageById }) => {
    const messagesRef = useRef(null);

    const onNewMessage = (data) => {
        addMessage(data);
    };

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
        if (!currentDialogId) {
            return;
        }
        messagesRef.current.scrollTo(0, 999999);
    }, [items]);

    if (!currentDialogId) {
        return <Empty description="Выберите диалог" />;
    }

    return <BaseMessages
        user={user}
        blockRef={messagesRef}
        items={items}
        isLoading={isLoading}
        onRemoveMessage={removeMessageById}
    />;
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