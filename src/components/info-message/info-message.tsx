import styles from './info-message.module.css';

type TInfoMessage = {
	text: string;
	actionText?: string;
};

export const InfoMessage = ({ text, actionText }: TInfoMessage) => {
	return (
		<div className={styles.info_wrap}>
			<p className='text text_type_main-medium'>{text}</p>
			<p className='text text_type_main-medium'>{actionText}</p>
		</div>
	);
};
