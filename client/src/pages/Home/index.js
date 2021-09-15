import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Messages, ChatInput, Status, Sidebar } from 'containers';
import { dialogActions } from '../../redux/actions';

import './Home.scss';

const Home = ({ location, setCurrentDialogId, user }) => {
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
                {user && <div className="chat__current-dialog">
                    <Status online />
                    <Messages />
                    <div className="chat__dialog-input">
                        <ChatInput />
                    </div>
                </div>}
            </div>
        </section>
    );
};

export default withRouter(connect(({ user }) => ({ user: user.data }), dialogActions)(Home));
