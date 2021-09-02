import React from 'react';
import { Button } from 'antd';
import { TeamOutlined, FormOutlined, EllipsisOutlined } from '@ant-design/icons';

import { Dialogs, Messages, ChatInput, Status } from 'containers';

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <div className="chat">
                <div className="chat__sidebar">
                    <div className="chat__sidebar-header">
                        <div>
                            <TeamOutlined />
                            <span>Список диалогов</span>
                        </div>
                        <Button type="link" shape="circle" icon={<FormOutlined />} />
                    </div>
                    <div className="chat__sidebar-dialogs">
                        <Dialogs userId={0} />
                    </div>
                </div>
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
