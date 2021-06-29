import PropTypes from 'prop-types';
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import classNames from 'classnames';

import { Message } from 'components';

import './Messages.scss';

const Messages = ({ blockRef, isLoading, items }) => {
    return (
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
                        <Message key={item._id} {...item} />
                    )) : <Empty description="Нет сообщений" />
                ) : <Empty description="Выберите диалог" />
            }
        </div>
    );
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
