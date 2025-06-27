import styles from './error-message.module.css';

type TErrorMessage = {
	text: string;
	isInput?: boolean;
};

export const ErrorMessage = ({ text, isInput }: TErrorMessage) => {
	return (
		<p
			className={
				isInput ? `${styles.text_input} text text_type_main-small` : styles.text
			}>
			{text}
		</p>
	);
};
