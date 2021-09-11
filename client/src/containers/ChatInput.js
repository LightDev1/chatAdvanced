import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { filesApi } from 'utils/api'
import { messagesActions } from 'redux/actions'
import { ChatInput as BaseChatInput } from 'components';

const ChatInput = ({ fetchSendMessage, currentDialogId }) => {
    navigator.getUserMedia = (navigator.getUserMedia ||
        navigator.mozGetUserMedia ||
        navigator.msGetUserMedia ||
        navigator.webkitGetUserMedia);

    const [value, setValue] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [mediaRecorder, setMediaRecorder] = useState(null);
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

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

        recorder.ondataavailable = (event) => {
            const audioUrl = URL.createObjectURL(event.data);
            new Audio(audioUrl).play();
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

    const sendMessage = () => {
        fetchSendMessage(value, currentDialogId, attachments.map(file => file.uid));
        setValue('');
        setAttachments([]);
    };

    const handleSendMessage = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    const onStopRecording = () => {
        mediaRecorder.stop();
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
            addEmoji={addEmoji}
            handleSendMessage={handleSendMessage}
            toggleEmojiPicker={toggleEmojiPicker}
            sendMessage={sendMessage}
            attachments={attachments}
            onSelectFiles={onSelectFiles}
            isRecording={isRecording}
            onRecord={onRecord}
            onStopRecording={onStopRecording}
        />
    );
};

export default connect(({ dialogs }) => dialogs, messagesActions)(ChatInput);
