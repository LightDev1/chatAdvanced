import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SmileOutlined, CameraOutlined, AudioOutlined, SendOutlined } from '@ant-design/icons';

import './ChatInput.scss';

const ChatInput = () => {
    const [value, setValue] = useState('');

    return (
        <div className="chat-input">
            <div className="chat-input__smile-btn">
                <Button type="link" shape="circle" icon={<SmileOutlined />} />
            </div>
            <Input
                onChange={(event) => { setValue(event.target.value) }}
                placeholder="Введите текст сообщения…"
                size="large"
            />
            <div className="chat-input__actions">
                <Button type="link" shape="circle" icon={<CameraOutlined />} />
                {value ? <Button type="link" shape="circle" icon={<SendOutlined />} /> : <Button type="link" shape="circle" icon={<AudioOutlined />} />}
            </div>
        </div>
    );
};

export default ChatInput;
