import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'react-redux';
import { Empty } from 'antd';

import socket from 'core/socket';
import { messagesActions } from '../redux/actions';
import { Messages as BaseMessages } from 'components';
import { find } from 'lodash-es';

const Messages = ({ currentDialog, user, fetchMessages, attachments, addMessage, items, isLoading, removeMessageById }) => {
    const messagesRef = useRef(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [blockHeight, setBlockHeight] = useState(138);
    const [isTyping, setIsTyping] = useState(false);
    let typingTimeoutId = null;

    const onNewMessage = (data) => {
        addMessage(data);
    };

    const toggleIsTyping = () => {
        setIsTyping(true);
        clearInterval(typingTimeoutId);
        typingTimeoutId = setTimeout(() => {
            setIsTyping(false);
        }, 3000);
    };

    useEffect(() => {
        socket.on('DIALOGS:TYPING', toggleIsTyping);

        return () => {
            socket.removeListener('DIALOGS:TYPING', toggleIsTyping);
        };
    }, []);

    useEffect(() => {
        if (attachments.length) {
            setBlockHeight(245);
        } else {
            setBlockHeight(138);
        }
    }, [attachments]);

    useEffect(() => {
        if (currentDialog) {
            fetchMessages(currentDialog._id);
        }

        socket.on('MESSAGES:NEW_MESSAGE', onNewMessage);

        return () => {
            socket.removeListener('MESSAGES:NEW_MESSAGE', onNewMessage);
        };
        // eslint-disable-next-line
    }, [currentDialog, fetchMessages]);

    useEffect(() => {
        if (!currentDialog) {
            return;
        }
        messagesRef.current.scrollTo(0, 999999);
        // eslint-disable-next-line
    }, [items]);

    if (!currentDialog) {
        return <Empty description="Выберите диалог" />;
    }

    return <BaseMessages
        user={user}
        blockRef={messagesRef}
        items={items}
        isLoading={isLoading}
        onRemoveMessage={removeMessageById}
        setPreviewImage={setPreviewImage}
        previewImage={previewImage}
        blockHeight={blockHeight}
        isTyping={isTyping}
        partner={
            user._id !== currentDialog.partner._id ? currentDialog.partner : currentDialog.author
        }
    />;
};

export default connect(
    ({ dialogs, messages, user, attachments }) => ({
        currentDialog: find(dialogs.items, { _id: dialogs.currentDialogId }),
        items: messages.items,
        isLoading: messages.isLoading,
        attachments: attachments.items,
        user: user.data,
    }),
    messagesActions
)(Messages);