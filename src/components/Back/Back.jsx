import React from 'react'
import './Back.css'



const Back = ({ bgImage }) => {
  return (
    <div className='BackWrapper'>
        <div className='BackContent'>
            <img src={bgImage} alt='Background Image'/>
        </div>
    </div>
    )
}

export default Back