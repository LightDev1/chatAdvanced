import React from 'react';

import { Messages, ChatInput, Status, Sidebar } from 'containers';

import './Home.scss';

const Home = () => {
    return (
        <section className="home">
            <div className="chat">
                <Sidebar />
                <div className="chat__current-dialog">
                    <div className="chat__dialog-header">
                        <Status online />
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
