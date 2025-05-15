import styles from './error-message.module.css';

export const ErrorMessage = ({ text, actionText }) => {
	return (
		<div className={styles.error_wrap}>
			<p className='text text_type_main-medium'>{text}</p>
			<p className='text text_type_main-medium'>{actionText}</p>
		</div>
	);
};
