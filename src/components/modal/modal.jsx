import { useEffect } from "react";
import { createPortal } from "react-dom";
import modalStyles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

export function Modal({ children, title, onClose }) {
  useEffect(() => {
    const closeEsc = (e) => {
      if (e.key === 'Escape') {
        onClose();
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
        <ModalOverlay onClose={onClose} />
        <div className={modalStyles.container}>
          <div className={`${modalStyles.text} pt-10 pr-10 pl-10`}>
            <h1 className="text text_type_main-large">{title}</h1>
            <button className={modalStyles.button} onClick={onClose}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {children}
        </div>
      </>
    ), 
    modalRoot
  );
} 


export default Modal;