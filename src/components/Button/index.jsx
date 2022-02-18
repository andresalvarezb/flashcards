import React from 'react'
import './button.css'

function Button({ children, type, modo, onClick }) {
    return (
        <button
            className={`btn btn--${modo}`}
            onClick={onClick}
            type={type || 'button'}
        >
            {children}
        </button>
    )
}

export default Button
