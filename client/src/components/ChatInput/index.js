import React from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import { Picker } from 'emoji-mart';
import { UploadField } from '@navjobs/upload';

import { UploadFiles } from 'components';
import './ChatInput.scss';

const { TextArea } = Input;

const ChatInput = ({ value, setValue, emojiPickerVisible, isLoading, isRecording, addEmoji, onRecord, sendMessage, onHideRecording, removeAttachment, onSelectFiles, handleSendMessage, toggleEmojiPicker, attachments }) => {
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
                {
                    isRecording ? (
                        <div className="chat-input__record-status">
                            <i className="chat-input__record-status-bubble" ></i>
                            Recording...
                            <Button
                                type="link"
                                shape="circle"
                                icon={<CloseOutlined />}
                                onClick={onHideRecording}
                                className="stop-recording"
                            />
                        </div>) : (
                        <TextArea
                            onChange={(event) => { setValue(event.target.value) }}
                            onKeyUp={handleSendMessage}
                            placeholder="?????????????? ?????????? ?????????????????????"
                            size="large"
                            value={value}
                            autoSize={{ minRows: 1, maxRows: 6 }}
                        />
                    )
                }

                <div className="chat-input__actions">
                    <UploadField
                        onFiles={onSelectFiles}
                        containerProps={{
                            className: 'chat-input__actions-upload-btn'
                        }}
                        uploadProps={{
                            accept: '.jpg,.jpeg,.png,.gif,.bmp,.ogg',
                            multiple: 'multiple'
                        }}
                    >
                        <Button type="link" shape="circle" icon={<CameraOutlined />} />
                    </UploadField>
                    {isLoading ? (
                        <Button
                            type="link"
                            shape="circle"
                            icon={<LoadingOutlined />}
                            onClick={sendMessage}
                        />) : isRecording || value || attachments.length ? (
                            <Button
                                type="link"
                                shape="circle"
                                icon={<SendOutlined />}
                                onClick={sendMessage}
                            />)
                        : (
                            <div className="chat-input-record-btn">
                                <Button
                                    type="link"
                                    shape="circle"
                                    icon={<AudioOutlined />}
                                    onClick={onRecord}
                                />
                            </div>
                        )
                    }
                </div>
            </div >
            {attachments.length > 0 && <div className="chat-input__attachments">
                <UploadFiles attachments={attachments} removeAttachment={removeAttachment} />
            </div>}
        </>
    );
};

export default ChatInput;
