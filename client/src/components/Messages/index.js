import PropTypes from 'prop-types';
import { Empty, Spin, Modal } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Message } from 'components';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items, isTyping, user, blockHeight, onRemoveMessage, previewImage, setPreviewImage, partner }) => {
    console.log(partner);
    return (
        <div
            className="chat__dialog-messages"
            style={{ height: `calc(100% - ${blockHeight}px)` }}
        >
            <div
                ref={blockRef}
                className={classNames('messages', { 'messages--loading': isLoading })}
            >
                {
                    isLoading && !user ? (
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
                                setPreviewImage={setPreviewImage}
                            />
                        )) : <Empty description="Нет сообщений" />
                    ) : <Empty description="Выберите диалог" />
                }
                {isTyping && <Message isTyping={isTyping} user={partner} />}
                <Modal
                    visible={!!previewImage}
                    footer={null}
                    onCancel={() => setPreviewImage(null)}
                >
                    <img src={previewImage} style={{ width: '100%' }} alt="Preview" />
                </Modal>
            </div>
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
