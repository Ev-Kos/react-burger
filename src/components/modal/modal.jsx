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
  }, [onClose]);

  return createPortal(
    (
      <>
        <ModalOverlay onClick={ onClose } />
        <div className={ modalStyles.modal }>
          <div className={ modalStyles.title }>
            <h3 className="text text_type_main-large">{ title }</h3>
            <CloseIcon type="primary" onClick={ onClose } />
          </div>
        { children }
        </div>
      </>
    ), 
    modalRoot
  );
} 


export default Modal;