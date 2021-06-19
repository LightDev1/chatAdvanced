import React from 'react';
import classNames from 'classnames';
import { isToday, format } from 'date-fns';

import { MessageIconReaded, Avatar } from '../index';

const getMessageTime = (createdAt) => {
    if (isToday(createdAt)) {
        return format(createdAt, 'HH:mm');
    } else {
        return format(createdAt, 'dd.MM.YYY')
    }
}

const DialogItem = ({ user, text, createdAt, unread, isMe }) => (
    <div className={classNames('dialogs__item', {
        'dialogs__item--online': user.isOnline,
    })}>
        <div className="dialogs__item-avatar">
            <Avatar user={user} />
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>{user.fullname}</b>
                <span>
                    {getMessageTime(createdAt)}
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>{text}</p>
                {isMe && <MessageIconReaded isMe={true} isReaded={true} />}
                {unread > 0 && <div className="dialogs__item-info-bottom-count">{unread > 9 ? '9+' : unread}</div>}
            </div>
        </div>
    </div>
);

export default DialogItem;
