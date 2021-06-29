import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Emoji } from 'emoji-mart';

import { Time, MessageIconReaded, Avatar } from '../index';

import { convertCurrentTime } from 'utils/helpers';

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

const Message = ({ avatar, user, text, date, isMe, isReaded, attachments, isTyping, audio }) => {
    return (
        <div className={classNames('message', {
            'message--isme': isMe,
            'message--is-typing': isTyping,
            'message--is-audio': audio,
            'message--image': attachments && attachments.length === 1,
        })}>
            <div className="message__content">
                {isReaded && <MessageIconReaded isMe={isMe} isReaded={isReaded} />}
                <div className="message__avatar">
                    <Avatar user={user} />
                </div>
                <div className="message__info">
                    {(audio || text || isTyping) && (
                        <div className="message__bubble">
                            {text && <p className="message__text"><Emoji
                                set={'apple'}
                                emoji={'santa'}
                                size={24} /></p>}
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
                            {attachments.map((item, index) => (
                                <div key={index} className="message__attachments-item">
                                    <img src={item.url} alt={item.filename} />
                                </div>
                            ))}
                        </div>
                    )
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
