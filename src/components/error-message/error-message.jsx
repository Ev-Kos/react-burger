import { string } from 'prop-types';
import styles from './error-message.module.css';

export const ErrorMessage = ({ text }) => {
	return <p className={styles.text}>{text}</p>;
};

ErrorMessage.propTypes = {
	text: string.isRequired,
};
