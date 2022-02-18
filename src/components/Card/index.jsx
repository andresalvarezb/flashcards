import React from 'react'
import './card.css'

function Card({question, answer}) {
  return (
    <div className='card'>
        <button className='card-btn'>❌</button>
        <div className='card-container-text'>
            <p className='card-question'>{question}</p>
            <p className='card-answer'>{answer}</p>
        </div>
    </div>
  )
}

export default Card
