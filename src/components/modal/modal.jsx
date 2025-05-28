import { useEffect } from 'react';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';
import { element, func, string } from 'prop-types';

const modalRoot = document.getElementById('modal');

export const Modal = ({ closeModal, title, children }) => {
	useEffect(() => {
		const closeEsc = (e) => {
			if (e.key === 'Escape') {
				closeModal();
			}
		};
		document.addEventListener('keydown', closeEsc);

		return () => {
			document.removeEventListener('keydown', closeEsc);
		};
	}, [closeModal]);

	return createPortal(
		<>
			<ModalOverlay onClick={closeModal} />
			<div className={styles.container}>
				<div className={`${styles.text} pt-10 pr-10 pl-10`}>
					<h1 className='text text_type_main-large'>{title}</h1>
					<button className={styles.button} onClick={closeModal}>
						<CloseIcon type='primary' />
					</button>
				</div>
				{children}
			</div>
		</>,
		modalRoot
	);
};

Modal.propTypes = {
	children: element.isRequired,
	title: string,
	closeModal: func.isRequired,
};
