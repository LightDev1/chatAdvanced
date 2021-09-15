import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import socket from 'core/socket';
import { filesApi } from 'utils/api'
import { messagesActions, attachmentsActions } from 'redux/actions'
import { ChatInput as BaseChatInput } from 'components';

const ChatInput = ({ dialogs: { currentDialogId }, user, attachments, fetchSendMessage, setAttachments, removeAttachment }) => {
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.webkitGetUserMedia);

    const [value, setValue] = useState('');
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [isRecording, setIsRecording] = useState('');
    const [isLoading, setIsLoading] = useState('');

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    const onRecord = () => {
        if (navigator.getUserMedia) {
            navigator.getUserMedia({ audio: true }, onRecording, onError);
        }
    };

    const onRecording = (stream) => {
        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);
        recorder.start();

        recorder.onstart = () => {
            setIsRecording(true);
        };

        recorder.onstop = () => {
            setIsRecording(false);
        };

        recorder.ondataavailable = async (event) => {
            const file = new File([event.data], 'audio.ogg', { type: 'audio/ogg' });

            setIsLoading(true);
            const { data } = await filesApi.upload(file);
            sendAudio(data.file._id).then(() => {
                setIsLoading(false);
            });
        };
    };

    const onError = (err) => {
        console.log('The following error occured: ' + err);
    };

    const handleOutsideClick = (el, event) => {
        if (el && !el.contains(event.target)) {
            setEmojiPickerVisible(false);
        }
    };

    const addEmoji = ({ colons }) => {
        setValue((value + ' ' + colons).trim());
    };

    const sendAudio = (audioId) => {
        return fetchSendMessage({
            text: null,
            dialog: currentDialogId,
            attachments: [audioId],
        });

    };

    const sendMessage = () => {
        if (isRecording) {
            return mediaRecorder.stop();
        } else if (value) {
            fetchSendMessage({
                text: value,
                dialog: currentDialogId,
                attachments: attachments.map(file => file.uid)
            });
        }

        setValue('');
        setAttachments([]);
    };

    const handleSendMessage = (event) => {
        socket.emit('DIALOGS:TYPING', {
            dialogId: currentDialogId,
            user,
        });

        if (event.key === 'Enter' && value.trim() !== '') {
            sendMessage();
        } else {
            return;
        }
    };

    const onHideRecording = () => {
        setIsRecording(false);
    };

    const onSelectFiles = async (files) => {
        let uploaded = []
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const uid = Math.round(Math.random() * 1000)

            uploaded = [
                ...uploaded,
                {
                    uid,
                    name: file.name,
                    status: 'uploading'
                }
            ];
            setAttachments(uploaded);

            const { data } = await filesApi.upload(file);

            uploaded = uploaded.map(item => {
                if (item.uid === uid) {
                    return {
                        status: 'done',
                        uid: data.file._id,
                        name: data.file.filename,
                        url: data.file.url,
                    };
                }
                return item;
            });
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
            isLoading={isLoading}
            addEmoji={addEmoji}
            handleSendMessage={handleSendMessage}
            toggleEmojiPicker={toggleEmojiPicker}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            isRecording={isRecording}
            onRecord={onRecord}
            onHideRecording={onHideRecording}
            removeAttachment={removeAttachment}
        />
    );
};

export default connect(
    ({ dialogs, attachments, user }) => ({ dialogs, attachments: attachments.items, user: user.data }),
    { ...messagesActions, ...attachmentsActions }
)(ChatInput);
