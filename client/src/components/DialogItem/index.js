import React from 'react';
import classNames from 'classnames';
import { isToday, format } from 'date-fns';

import { MessageIconReaded } from '../index';

import './DialogItem.scss';

const getMessageTime = (createdAt) => {
    if (isToday(createdAt)) {
        return format(createdAt, 'HH:mm');
    } else {
        return format(createdAt, 'dd.MM.YYY')
    }
}

const getAvatar = (avatar) => {
    if (avatar) {
        return (
            <img src={avatar} alt={`avatar`} />
        );
    } else {
        //make avatar
    }
}

const DialogItem = ({ user, text, createdAt, unreaded, isMe }) => (
    <div className={classNames('dialogs__item', {
        'dialogs__item--online': user.isOnline,
    })}>
        <div className="dialogs__item-avatar">
            {getAvatar(user.avatar)}
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
                {unreaded > 0 && <div className="dialogs__item-info-bottom-count">{unreaded > 9 ? '9+' : unreaded}</div>}
            </div>
        </div>
    </div>
);

export default DialogItem;
