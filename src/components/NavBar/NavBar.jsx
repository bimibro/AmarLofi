import React from 'react'
import './NavBar.css'
 


const NavBar = ({ onThemeToggle }) => {
  return (
    <div className='wrap'>
        <a href="/"><img className='Logo' src="/LofiLogoText.gif" alt="logo" />
        </a>
        
        <div className='NavMenu'>
            <a target='_blank' rel='noreferrer' href='https://github.com/bimibro'>
                <i className='fab fa-github'></i>
                <span>GitHub</span>
            </a>

            <a className='PortfolioA' target='' rel='noreferrer' href='/'>
                <i className='fas fa-globe'></i>
                <span>portfolio</span>
            </a>

            <button id='ThemeToggle' className='ThemeToggle'  onClick={onThemeToggle}>
                <img src='/ModeToggle.png' alt='dark mode icon' width={50}/>
                <img src='/ModeToggle.png' alt='light mode icon' width={50}/>
            </button>

            <button className='FullScreenToggle' onClick={() => {
                if (!document.fullscreenElement) {
                    document.documentElement.requestFullscreen();
                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    }
                }
            }}>
                <i className='fas fa-expand fa-lg'></i>
            </button>
        </div>
    </div>
  )
}

export default NavBar