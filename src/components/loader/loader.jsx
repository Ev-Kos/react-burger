import { bool, string } from 'prop-types';
import styles from './loader.module.css';

export const Loader = ({ text, isBackground }) => {
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

Loader.propTypes = {
	text: string,
	isBackground: bool,
};
