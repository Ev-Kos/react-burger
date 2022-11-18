import { useEffect, FC, ReactNode} from 'react';
import { createPortal } from 'react-dom';
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ModalOverlay } from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals') as HTMLDivElement;

export const Modal: FC<{children: ReactNode, title: string, closeModal: () => void}> = ({children, title, closeModal}) => {
  useEffect(() => {
    const closeEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    }
    document.addEventListener('keydown', closeEsc);

    return () => {
      document.removeEventListener('keydown', closeEsc);
    }
  }, []);

  return createPortal(
    (
      <>
        <ModalOverlay closeOverlay={closeModal} />
        <div className={modalStyles.container}>
          <div className={`${modalStyles.text} pt-10 pr-10 pl-10`}>
            <h1 className="text text_type_main-large">{title}</h1>
            <button className={modalStyles.button} onClick={closeModal}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </>
    ), 
    modalRoot
  )
} 