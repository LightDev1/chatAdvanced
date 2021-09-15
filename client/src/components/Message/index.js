import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Popover, Button } from 'antd';
import { EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import reactStringReplace from 'react-string-replace';
import { Emoji } from 'emoji-mart';

import { Time, MessageIconReaded, Avatar } from '../index';

import { convertCurrentTime, isAudio } from 'utils/helpers';

import waveSvg from 'assets/img/waves.svg';
import playSvg from 'assets/img/play.svg';
import pauseSvg from 'assets/img/pause.svg';

import './Message.scss';

const MessageAudio = ({ audioSrc }) => {
    const audioElem = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const togglePlay = () => {
        if (!isPlaying) {
            audioElem.current.play();
        } else {
            audioElem.current.pause();
        }
    };

    useEffect(() => {
        audioElem.current.volume = '0.1';
        audioElem.current.addEventListener('playing', () => {
            setIsPlaying(true);
        }, false);
        audioElem.current.addEventListener('ended', () => {
            setIsPlaying(false);
            setProgress(0);
        }, false);
        audioElem.current.addEventListener('pause', () => {
            setIsPlaying(false);
        }, false);
        audioElem.current.addEventListener('timeupdate', () => {
            const duration = (audioElem.current && audioElem.current.duration) || 0;
            setCurrentTime(audioElem.current.currentTime);
            setProgress((audioElem.current.currentTime / duration) * 100);
        });
    }, []);

    return (
        <div className="message__audio">
            <audio ref={audioElem} src={audioSrc} preload="auto" />
            <div
                className="message__audio-progress"
                style={{ width: progress + '%' }}
            ></div>
            <div className="message__audio-info">
                <div className="message__audio-btn">
                    <button onClick={togglePlay}>
                        {isPlaying ? <img src={pauseSvg} alt="Pause Svg" /> : <img src={playSvg} alt="Play Svg" />}
                    </button>
                </div>
                <div className="message__audio-wave">
                    <img src={waveSvg} alt="Wave Svg" />
                </div>
                <span className="message__audio-duration">{convertCurrentTime(currentTime)}</span>
            </div>
        </div>
    );
};

const Message = ({ read, user, text, date, isMe, attachments, isTyping, audio, onRemoveMessage, setPreviewImage }) => {
    const renderAttachmentItem = (item) => {
        if (item.ext !== 'webm') {
            return (
                <div key={item._id} onClick={() => setPreviewImage(item.url)} className="message__attachments-item">
                    <div className="message__attachments-item-overlay">
                        <EyeOutlined style={{ color: "white", fontSize: 18 }} />
                    </div>
                    <img src={item.url} alt={item.filename} />
                </div>
            );
        } else {
            return <MessageAudio key={item._id} audioSrc={item.url} />
        }
    };

    return (
        <div className={classNames('message', {
            'message--isme': isMe,
            'message--is-typing': isTyping,
            'message--is-audio': isAudio(attachments),
            'message--image': !isAudio(attachments) && attachments && attachments.length === 1 && !text,
        })}>
            <div className="message__content">
                <MessageIconReaded isMe={isMe} isReaded={read} />
                <Popover
                    title="Title"
                    trigger="click"
                    content={
                        <div>
                            <Button
                                onClick={onRemoveMessage}
                            >
                                Удалить сообщение
                            </Button>
                        </div>
                    }
                >
                    <div className="message__icon-actions">
                        <Button type="link" shape="circle" icon={<EllipsisOutlined />} />
                    </div>
                </Popover>
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__info">
                    {(text || isTyping) && (
                        <div className="message__bubble">
                            {text && <p className="message__text">{reactStringReplace(text, /:(.+?):/g, (match, i) => (
                                <Emoji key={i} emoji={match} set="apple" size={16} />
                            ))}</p>}
                            {isTyping && (<div className="message__typing">
                                <span />
                                <span />
                                <span />
                            </div>)}
                            {audio && <MessageAudio audioSrc={audio} />}
                        </div>
                    )}

                    {attachments && (
                        <div className="message__attachments">
                            {attachments.map((item) => renderAttachmentItem(item))}
                        </div>)
                    }

                    {date && (<span className="message__date">
                        <Time date={date} />
                    </span>)}
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
    attachments: PropTypes.array,
    isTyping: PropTypes.bool,
    isMe: PropTypes.bool,
    isReaded: PropTypes.bool,
    audio: PropTypes.string,
};

export default Message;
