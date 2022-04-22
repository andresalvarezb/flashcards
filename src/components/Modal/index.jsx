import React from 'react'
import ReactDOM from 'react-dom';
import './modal.css'

function Modal({ children }) {
    return ReactDOM.createPortal(
        <div className='modal-container'>
            {children}
        </div>,
        document.getElementById('modal')
    )
}
export default Modal