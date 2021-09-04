import React from 'react';
import { Button } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

import { Messages, ChatInput, Status, Sidebar } from 'containers';

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <div className="chat">
                <Sidebar />
                <div className="chat__current-dialog">
                    <div className="chat__dialog-header">
                        <div />
                        <Status online />
                        <Button type="link" shape="circle" icon={<EllipsisOutlined />} />
                    </div>
                    <div className="chat__dialog-messages">
                        <Messages />
                    </div>
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Home;
