import stylesOverlay from './modal-overlay.module.css';

function ModalOverlay ({onClose}) {
    return (
        <div className={stylesOverlay.overlay} onClick={onClose}></div>
    )
}

export default ModalOverlay; 