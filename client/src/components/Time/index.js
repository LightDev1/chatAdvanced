import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
// eslint-disable-next-line
import PropTypes from 'prop-types';

const Time = ({ date }) => (
    formatDistanceToNow(Date.parse(date), { addSuffix: true, locale: ru })
);

// Time.propTypes = {
//     date: PropTypes.string
// };

export default Time;
