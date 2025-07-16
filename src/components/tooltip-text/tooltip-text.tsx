import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './tooltip-text.module.css';

interface TooltipTextProps {
	text: string;
	className: string;
}

export const TooltipText = ({ text, className }: TooltipTextProps) => {
	const [isHovered, setIsHovered] = useState(false);
	const [isTruncated, setIsTruncated] = useState(false);
	const textRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);

	const checkTruncation = useCallback(() => {
		if (textRef.current && containerRef.current) {
			const isOverflowing =
				textRef.current.scrollWidth > containerRef.current.clientWidth ||
				textRef.current.scrollHeight > containerRef.current.clientHeight;

			setIsTruncated(isOverflowing);
		}
	}, []);

	useEffect(() => {
		const observer = new ResizeObserver(checkTruncation);

		if (containerRef.current) {
			observer.observe(containerRef.current);
			checkTruncation();
		}

		return () => {
			observer.disconnect();
		};
	}, [text, checkTruncation]);

	return (
		<div className={styles.container} ref={containerRef}>
			<p
				ref={textRef}
				className={`${styles.text} ${className}`}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}>
				{text}
			</p>

			{isHovered && isTruncated && <p className={styles.fool_text}>{text}</p>}
		</div>
	);
};
