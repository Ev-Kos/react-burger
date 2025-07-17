import styles from './round-image.module.css';

export const RoundImage = ({ src }: { src: string }) => {
	return (
		<div className={styles.image_wrap}>
			<img src={src} alt='' className={styles.image} />
		</div>
	);
};
