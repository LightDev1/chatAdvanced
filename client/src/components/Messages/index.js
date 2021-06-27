import PropTypes from 'prop-types';
import { Empty } from 'antd';

import { Message } from 'components';

const Messages = ({ items }) => {
    return items ? (<div>
        {items.map((item) => (<Message {...item} />
        ))}
    </div>) : <Empty description="Выберите диалог" />
};

Messages.propTypes = {
    items: PropTypes.array,
};

export default Messages;
