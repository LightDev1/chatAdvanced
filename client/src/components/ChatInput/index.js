import React, { useEffect, useState } from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import { UploadField } from '@navjobs/upload';

import { UploadFiles } from 'components';
import './ChatInput.scss';

const { TextArea } = Input;

const ChatInput = ({ onSendMessage, currentDialogId }) => {
    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    const handleSendMessage = (event) => {
        if (event.key === 'Enter') {
            onSendMessage(value, currentDialogId);
            setValue('');
        }
    };

    const addEmoji = ({ colons }) => {
        setValue((value + ' ' + colons).trim());
    };

    const handleOutsideClick = (el, event) => {

        if (el && !el.contains(event.target)) {
            setEmojiPickerVisible(false);
        }
    };

    useEffect(() => {
        const element = document.querySelector('.chat-input__smile-btn');

        document.addEventListener('click', handleOutsideClick.bind(this, element));

        return () => {
            document.removeEventListener('click', handleOutsideClick.bind(this, element));
        };
    }, []);

    return (
        <>
            <div className="chat-input">
                <div className="chat-input__smile-btn">
                    <div className="chat-input__emoji-picker">{emojiPickerVisible && (
                        <Picker
                            set='apple'
                            onSelect={(emojiTag => addEmoji(emojiTag))}
                        />)}
                    </div>
                    <Button
                        type="link"
                        shape="circle"
                        icon={<SmileOutlined />}
                        onClick={toggleEmojiPicker}
                    />
                </div>
                <TextArea
                    onChange={(event) => { setValue(event.target.value) }}
                    onKeyUp={handleSendMessage}
                    placeholder="Введите текст сообщения…"
                    size="large"
                    value={value}
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
                <div className="chat-input__actions">
                    <UploadField
                        onFiles={files => console.log(files)}
                        containerProps={{
                            className: 'chat-input__actions-upload-btn'
                        }}
                        uploadProps={{
                            accept: '.jpg,.jpeg,.png,.gif,.bmp',
                            multiple: 'multiple'
                        }}
                    >
                        <Button type="link" shape="circle" icon={<CameraOutlined />} />
                    </UploadField>
                    {value ? <Button type="link" shape="circle" icon={<SendOutlined />} /> : <Button type="link" shape="circle" icon={<AudioOutlined />} />}
                </div>
            </div >
            <div>
                <UploadFiles />
            </div>
        </>
    );
};

export default ChatInput;
