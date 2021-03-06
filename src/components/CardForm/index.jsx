import React from 'react'
import Button from '../Button'
import './cardForm.css'

function CardForm({handleClick, infoCard, handleChange, createCard}) {

    return (
        <form className='modal'>
            <label className='modal-topic'>
                <span>Topic :</span>
                <input value={infoCard.topic} onChange={handleChange} type='text' name='topic'/>
            </label>
            <label className='modal-textarea'>
                <textarea value={infoCard.question} onChange={handleChange} cols={40} rows={4} name='question' placeholder='What is the question' />
            </label>
            <label className='modal-textarea'>
                <textarea value={infoCard.answer} onChange={handleChange} cols={40} rows={4} name='answer' placeholder='What is the answer' />
            </label>
            <label className='modal-buttons'>
                <Button onClick={() => createCard(infoCard)} >Add</Button>
                <Button modo='secondary' onClick={handleClick}>Cancel</Button>
            </label>
        </form>
    )
}

export default CardForm
