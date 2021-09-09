import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Messages, ChatInput, Status, Sidebar } from 'containers';
import { dialogActions } from '../../redux/actions';

import './Home.scss';

const Home = ({ location, setCurrentDialogId }) => {
    useEffect(() => {
        const { pathname } = location;
        const dialodId = pathname.split('/').pop();
        setCurrentDialogId(dialodId);
        // eslint-disable-next-line
    }, [location.pathname]);

    return (
        <section className="home">
            <div className="chat">
                <Sidebar />
                <div className="chat__current-dialog">
                    <Status online />
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

export default withRouter(connect(({ dialogs }) => dialogs, dialogActions)(Home));
