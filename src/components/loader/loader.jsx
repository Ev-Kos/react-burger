import styles from './loader.module.css';

export const Loader = () => {
	return (
		<div className={styles.loader_wrap}>
			<span className={styles.loader}></span>
		</div>
	);
};
