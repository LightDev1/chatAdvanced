import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

const Time = ({ date }) => (
    formatDistanceToNow(date, { addSuffix: true, locale: ru })
);

Time.propTypes = {
    date: PropTypes.string
};

export default Time;
