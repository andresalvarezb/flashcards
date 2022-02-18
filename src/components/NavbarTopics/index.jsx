import React from 'react'
import './navbarTopic.css'

function NavbarTopics({children}) {
  return (
      <>
        <ul className='navbar'>
            {children}
        </ul>
        <hr/>
      </>
  )
}

export default NavbarTopics
