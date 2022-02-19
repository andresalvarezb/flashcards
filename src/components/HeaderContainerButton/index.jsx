import React from 'react'
import './headerContainerButton.css'

function HeaderContainerButton({children}) {
  return (
    <header className='containerButton'>
        {children}
    </header>
  )
}

export default HeaderContainerButton
