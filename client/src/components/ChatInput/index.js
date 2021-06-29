import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';

import { UploadField } from '@navjobs/upload'

import './ChatInput.scss';

const ChatInput = () => {
    const [value, setValue] = useState('');
    const [emojiPickerVisible, setEmojiPickerVisible] = useState(false);

    const toggleEmojiPicker = () => {
        setEmojiPickerVisible(!emojiPickerVisible);
    };

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                {emojiPickerVisible && <div className="chat-input__emoji-picker">
                    <Picker set='apple' />
                </div>}
                <Button
                    type="link"
                    shape="circle"
                    icon={<SmileOutlined />}
                    onClick={toggleEmojiPicker}
                />
            </div>
            <Input
                onChange={(event) => { setValue(event.target.value) }}
                placeholder="Введите текст сообщения…"
                size="large"
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
    );
};

export default ChatInput;
