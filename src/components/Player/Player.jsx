import React, { useState } from 'react'
import './Player.css' 

const Player = () => {
    const [volume, setVolume] = useState(50);

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

  return (
    <div className='PlayerWrapper'>
        <div className='TitleWrapper'>
            <div className='SongTitle'>
                <span className='Title'>Alternative Outro</span>
                <span className='Creator'>Lucki</span>
            </div>
        </div>



        <div className='VolumeWrapper'>
            <div className='VolumeSlider'>
                <input type="range" min='0' max='100' value={volume} onChange={handleVolumeChange} className='slider'/>
                <i id='TaskManagerButton' className="fa-regular fa-clock"></i>
            </div>
        </div>
    </div>
  )
}

export default Player