import PropTypes from 'prop-types';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Message } from 'components';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items, user, onRemoveMessage }) => {
    return (
        <div
            className="chat__dialog-messages"
            style={{ height: `calc(100% - 245px)` }}
        >
            <div
                ref={blockRef}
                className={classNames('messages', { 'messages--loading': isLoading })}
            >
                {
                    isLoading ? (
                        <Spin
                            indicator={LoadingOutlined}
                            tip="Загрузка сообщений..."
                            size="large"
                        />
                    ) : items && !isLoading ? (
                        items.length > 0 ? items.map((item) => (
                            <Message
                                key={item._id} {...item}
                                isMe={user._id === item.user._id}
                                onRemoveMessage={onRemoveMessage.bind(this, item._id)}
                            />
                        )) : <Empty description="Нет сообщений" />
                    ) : <Empty description="Выберите диалог" />
                }
            </div>
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
