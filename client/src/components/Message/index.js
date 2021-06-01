import React from 'react';
import PropTypes from 'prop-types';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ru } from 'date-fns/locale';
import classNames from 'classnames';

import './Message.scss';

const Message = ({ avatar, user, text, date, isMe }) => {
    return (
        <div className={classNames('message', { 'message--isme': isMe })}>
            <div className="message__content">
                <div className="message__avatar">
                    <img src={avatar} alt={`Avatar ${user.fullname}`} />
                </div>
                <div className="message__info">
                    <div className="message__bubble">
                        <p className="message__text">{text}</p>
                    </div>
                    <span className="message__date">
                        {formatDistanceToNow(date, { addSuffix: true, locale: ru })}
                    </span>
                </div>

            </div>
        </div>
    );
};

Message.defaultProps = {
    user: {
        fullname: 'User'
    },
}

Message.propTypes = {
    avatar: PropTypes.string,
    text: PropTypes.string,
    date: PropTypes.object,
    user: PropTypes.object,
};

export default Message;
