import styles from './feed-image.module.css';

type TFeedImageProps = {
	image: string;
	length: number;
	index: number;
};

export const FeedImage = ({ image, length, index }: TFeedImageProps) => {
	return (
		<>
			<div className={styles.image_wrap}>
				<img src={image} alt='' className={styles.image} />
			</div>
			{index === 5 && length > 6 && (
				<p
					className={`${styles.count} text text_type_main-default`}>{`+${length - 6}`}</p>
			)}
		</>
	);
};
