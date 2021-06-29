import React from 'react';
import classNames from 'classnames';
import { isToday, format } from 'date-fns';

import { MessageIconReaded, Avatar } from '../index';

const getMessageTime = (createdAt) => {
    if (isToday(Date.parse(createdAt))) {
        return format(Date.parse(createdAt), 'HH:mm');
    } else {
        return format(Date.parse(createdAt), 'dd.MM.YYY')
    }
};

const DialogItem = ({ _id, user, text, createdAt, unread, isMe, onSelect, currentDialogId }) => (
    <div
        className={classNames('dialogs__item', {
            'dialogs__item--online': user.isOnline,
            'dialogs__item--selected': currentDialogId === _id,
        })}
        onClick={onSelect.bind(this, _id)}
    >
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
