import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { filesApi } from 'utils/api'
import { messagesActions } from 'redux/actions'
import { ChatInput as BaseChatInput } from 'components';

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    const handleOutsideClick = (el, event) => {
        if (el && !el.contains(event.target)) {
            setEmojiPickerVisible(false);
        }
    };

    const addEmoji = ({ colons }) => {
        setValue((value + ' ' + colons).trim());
    };

    const sendMessage = () => {
        fetchSendMessage(value, currentDialogId);
        setValue('');
    };

    const handleSendMessage = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const onUpload = (file, uid) => {
        filesApi.upload(file).then(({ data }) => {
            setAttachments(attachments.map(file => {
                if (file.uid === uid) {
                    file = {
                        status: 'done',
                        uid: data.file._id,
                        name: data.file.filename,
                        url: data.file.url,
                    }
                }

                return file;
            }));
        });
    };

    const onSelectFiles = (files) => {
        let uploaded = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000)

            uploaded.push({
                uid,
                name: file.name,
                status: 'uploading'
            });
            onUpload(file, uid);
        }
        setAttachments(uploaded);
    };

    useEffect(() => {
        const element = document.querySelector('.chat-input__smile-btn');

        document.addEventListener('click', handleOutsideClick.bind(this, element));

        return () => {
            document.removeEventListener('click', handleOutsideClick.bind(this, element));
        };
    }, []);

    if (!currentDialogId) {
        return null;
    }

    return (
        <BaseChatInput
            value={value}
            setValue={setValue}
            addEmoji={addEmoji}
            handleSendMessage={handleSendMessage}
            toggleEmojiPicker={toggleEmojiPicker}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
        />
    );
};

export default connect(({ dialogs }) => dialogs, messagesActions)(ChatInput);
