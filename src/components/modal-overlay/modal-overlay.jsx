import stylesOverlay from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay ({closeOverlay}) {
    return (
        <div className={stylesOverlay.overlay} onClick={closeOverlay}></div>
    )
}

ModalOverlay.propTypes = {
    closeOverlay: PropTypes.func.isRequired,
  };

export default ModalOverlay; 