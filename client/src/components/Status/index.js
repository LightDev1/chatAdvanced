import React from 'react'
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Status.scss';

const Status = ({ online, fullname }) => (
    <div className="chat__dialog-header-center">
        <b className="сhat__dialog-header-username">{fullname}</b>
        <div className="chat__dialog-header-status">
            <span className={classNames('status', { 'status--online': online })}>
                {online ? 'онлайн' : 'не в сети'}
            </span>
        </div>
    </div>

);

Status.propTypes = {
    online: PropTypes.bool,
}

export default Status;
