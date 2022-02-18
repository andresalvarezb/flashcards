import React, { useState } from 'react'
import './card.css'

function Card({el, deleteCard}) {
    const {question, answer} = el
    const [isCheck, setIsCheck] = useState(false)

    const handleDoubleClick = () => {
        setIsCheck(!isCheck)
    }

  return (
    <div className='card' onDoubleClick={handleDoubleClick}>
        <button className='card-btn' onClick={() => deleteCard(el)}>❌</button>
        <div className={`card-container-text ${isCheck && 'changeHeight'}`}>
            <p className='card-question'>{question}</p>
            <p className={`card-answer ${isCheck && 'card-answer--isVisible'}`}>{answer}</p>
        </div>
    </div>
  )
}

export default Card
