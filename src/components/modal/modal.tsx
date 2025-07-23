import { ReactNode, useEffect } from 'react';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { createPortal } from 'react-dom';

type TModal = {
	closeModal: VoidFunction;
	title?: string;
	children: ReactNode;
	isNumber?: boolean;
};

const modalRoot = document.getElementById('modal') as HTMLElement;

export const Modal = ({ closeModal, title, children, isNumber }: TModal) => {
	useEffect(() => {
		const closeEsc = (e: KeyboardEvent) => {
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
					<h1
						className={
							isNumber
								? 'text text_type_digits-default'
								: 'text text_type_main-large'
						}>
						{title}
					</h1>
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
