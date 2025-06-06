import { func } from 'prop-types';
import styles from './modal-overlay.module.css';

export const ModalOverlay = ({ onClick }) => {
	return <button className={styles.overlay} onClick={onClick}></button>;
};

ModalOverlay.propTypes = {
	onClick: func.isRequired,
};
