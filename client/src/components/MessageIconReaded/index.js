import PropTypes from 'prop-types';

import readedSvg from 'assets/img/readed.svg';
import noReadedSvg from 'assets/img/noreaded.svg';

const MessageIconReaded = ({ isMe, isReaded }) => (
    (isMe && (isReaded ? (
        <img className="message__icon-readed" src={readedSvg} alt="Readed Icon" />
    ) : (
        <img className="message__icon-readed message__icon-readed--no" src={noReadedSvg} alt="No readed Icon" />
    ))) || null
);

MessageIconReaded.propTypes = {
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
};

export default MessageIconReaded;
