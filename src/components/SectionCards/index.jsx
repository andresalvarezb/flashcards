import React from 'react'
import './sectionCards.css'

function sectionCards({children}) {
  return (
    <div className='wrapper-cards'>
        {children}
    </div>
  )
}

export default sectionCards
