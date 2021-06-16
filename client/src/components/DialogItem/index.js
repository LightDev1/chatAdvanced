import React from 'react';
import classNames from 'classnames';
import { Time, MessageIconReaded } from '../index';

import './DialogItem.scss';

const getAvatar = (avatar) => {
    if (avatar) {
        return (
            <img src="https://sun2.tele2-nn.userapi.com/s/v1/if1/pRhD7sGwZ5QIyygNGKi47eI5_BtAFeHPbrNVrPYKQFjnD24CaT3bCB_GghhEuZObJz6H_xmh.jpg?size=50x0&quality=96&crop=19,1,889,889&ava=1" alt={`avatar`} />
        );
    } else {
        //make avatar
    }
}

const DialogItem = ({ user, message, unreaded }) => (
    <div className={classNames('dialogs__item', {
        'dialogs__item--online': user.isOnline,
    })}>
        <div className="dialogs__item-avatar">
            {/* <img src={user.avatar} alt={`${user.fullname} avatar`} /> */}
            {getAvatar('https://sun2.tele2-nn.userapi.com/s/v1/if1/pRhD7sGwZ5QIyygNGKi47eI5_BtAFeHPbrNVrPYKQFjnD24CaT3bCB_GghhEuZObJz6H_xmh.jpg?size=50x0&quality=96&crop=19,1,889,889&ava=1')}
        </div>
        <div className="dialogs__item-info">
            <div className="dialogs__item-info-top">
                <b>Евгений Поносенко</b>
                <span>
                    {/* <Time date={new Date()} /> */}
                    13:00
                </span>
            </div>
            <div className="dialogs__item-info-bottom">
                <p>Вчера Е3 смотрел, ну норм игры, сталкер выйдет, прикольно</p>
                <MessageIconReaded isMe={true} isReaded={true} />
                {unreaded > 0 && <div className="dialogs__item-info-bottom-count">{unreaded > 9 ? '9+' : unreaded}</div>}
            </div>
        </div>
    </div>
);

export default DialogItem;
