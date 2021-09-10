import React from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import { UploadField } from '@navjobs/upload';

import { UploadFiles } from 'components';
import './ChatInput.scss';

const { TextArea } = Input;

const ChatInput = ({ value, setValue, emojiPickerVisible, addEmoji, onSelectFiles, handleSendMessage, sendMessage, toggleEmojiPicker, attachments }) => {
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
                        onFiles={onSelectFiles}
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
                    {value ? (
                        <Button
                            type="link"
                            shape="circle"
                            icon={<SendOutlined />}
                            onClick={sendMessage}
                        />)
                        : <Button type="link" shape="circle" icon={<AudioOutlined />} />}
                </div>
            </div >
            <div className="chat-input__attachments">
                <UploadFiles attachments={attachments} />
            </div>
        </>
    );
};

export default ChatInput;
