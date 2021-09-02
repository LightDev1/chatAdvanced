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

const DialogItem = ({ _id, isMe, currentDialogId, lastMessage, onSelect }) => (
    <Link to={`/dialogs/${_id}`}>
        <div
            className={classNames('dialogs__item', {
                'dialogs__item--online': lastMessage.user.isOnline,
                'dialogs__item--selected': currentDialogId === _id,
            })}
            onClick={() => {
                onSelect(_id);
            }}
        >
            <div className="dialogs__item-avatar">
                <Avatar user={lastMessage.user} />
            </div>
            <div className="dialogs__item-info">
                <div className="dialogs__item-info-top">
                    <b>{lastMessage.user.fullname}</b>
                    <span>
                        {getMessageTime(lastMessage.createdAt)}
                    </span>
                </div>
                <div className="dialogs__item-info-bottom">
                    <p>{lastMessage.text}</p>
                    {isMe && <MessageIconReaded isMe={true} isReaded={true} />}
                    {lastMessage.unread > 0 && <div className="dialogs__item-info-bottom-count">{lastMessage.unread > 9 ? '9+' : lastMessage.unread}</div>}
                </div>
            </div>
        </div>
    </Link>
);

export default DialogItem;
