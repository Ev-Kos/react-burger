import { string } from 'prop-types';
import styles from './info-message.module.css';

export const InfoMessage = ({ text, actionText }) => {
	return (
		<div className={styles.info_wrap}>
			<p className='text text_type_main-medium'>{text}</p>
			<p className='text text_type_main-medium'>{actionText}</p>
		</div>
	);
};

InfoMessage.propTypes = {
	text: string.isRequired,
	actionText: string,
};
