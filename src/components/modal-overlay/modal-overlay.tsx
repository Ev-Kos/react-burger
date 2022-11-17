import stylesOverlay from './modal-overlay.module.css';
import { FC, MouseEventHandler } from 'react';

export const ModalOverlay: FC<{closeOverlay: MouseEventHandler<HTMLDivElement>}> = ({closeOverlay}) => {
    return (
        <div className={stylesOverlay.overlay} onClick={closeOverlay}></div>
    )
}



 