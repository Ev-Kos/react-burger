import styles from './loader.module.css';

type TLoader = {
	text?: string;
	isBackground?: boolean;
};

export const Loader = ({ text, isBackground }: TLoader) => {
	return (
		<div
			className={
				isBackground ? styles.loader_wrap_background : styles.loader_wrap
			}>
			<p className='text text_type_main-large'>{text}</p>
			<span className={styles.loader}></span>
		</div>
	);
};
