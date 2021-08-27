import { notification } from 'antd';

const openNotification = ({ text, title, type = 'info', duration = 2 }) => notification[type]({
    message: title,
    description: text,
    duration: duration,
});

export default openNotification;
