import React from 'react';
import classNames from 'classnames';
import { isToday, format } from 'date-fns';
import { Link } from 'react-router-dom';

import { MessageIconReaded, Avatar } from '../index';

const getMessageTime = (createdAt) => {
    if (isToday(Date.parse(createdAt))) {
        return format(Date.parse(createdAt), 'HH:mm');
    } else {
        return format(Date.parse(createdAt), 'dd.MM.YYY')
    }
};

const renderLastMessage = (message, userId) => {
    let text = '';

    if (!message.text && message.attachments.length) {
        text = 'Медиасообщение';
    } else {
        text = message.text;
    }

    return `${message.user._id === userId ? 'Вы: ' : ''} ${text}`;
}

const DialogItem = ({ _id, isMe, currentDialogId, userId, partner, lastMessage }) => (
    <Link to={`/dialogs/${_id}`}>
        <div
            className={classNames('dialogs__item', {
                'dialogs__item--online': partner.isOnline,
                'dialogs__item--selected': currentDialogId === _id,
            })}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={partner} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{partner.fullname}</b>
                    <span>
                        {getMessageTime(lastMessage.createdAt)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{renderLastMessage(lastMessage, userId)}</p>
                    {isMe && <MessageIconReaded isMe={true} isReaded={lastMessage.read} />}
                    {lastMessage.unread > 0 && <div className="dialogs__item-info-bottom-count">{lastMessage.unread > 9 ? '9+' : lastMessage.unread}</div>}
                </div>
            </div>
        </div>
    </Link>
);

export default DialogItem;
