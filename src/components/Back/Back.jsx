// react and css imports
import React from 'react'
import './Back.css'

// Back component that displays background videos based on the mode (light or dark)
const Back = ({ mode }) => {
  return (
    <div className='BackWrapper'>
      <div className='BackContent'>
        <video className={`videoBg videoIn${mode === 'light' ? ' visible' : ''}`} autoPlay loop muted >
          <source src={process.env.PUBLIC_URL + '/Day-sunny.mp4'} type="video/mp4" />
        </video>
        <video className={`videoBg videoOut${mode === 'dark' ? ' visible' : ''}`} autoPlay loop muted >
          <source src={process.env.PUBLIC_URL + '/Night-clear.mp4'} type="video/mp4" />
        </video>
      </div>
    </div>
  )
}

export default Back