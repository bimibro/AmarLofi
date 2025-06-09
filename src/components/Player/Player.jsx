import React, { useState } from 'react'
import './Player.css' 

const Player = () => {
    const [volume, setVolume] = useState(50);

    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };


    // if statement to determine which icon to show: 

    let volumeIcon;
    if (volume == 0) {
        volumeIcon = <i className="fa-solid fa-volume-xmark"></i>;
    } else if (volume > 70) {
        volumeIcon = <i className="fa-solid fa-volume-high"></i>;
    } else {
        volumeIcon = <i class="fa-solid fa-volume-low"></i>;
    }
    
//<i class="fa-solid fa-pause"></i> PAUSE BUTTON  --------------------------------------------------------------------------------------------------------
//<i class="fa-solid fa-pause"></i> PAUSE BUTTON  --------------------------------------------------------------------------------------------------------
//<i class="fa-solid fa-pause"></i> PAUSE BUTTON  --------------------------------------------------------------------------------------------------------


  return (
    <div className='PlayerWrapper'>
            <div className='TitleWrapper'>
                <div className='SongTitle'>
                    <span className='Title'>Alternative Outro</span>
                    <span className='Creator'>Lucki</span>
                </div>
            </div>

            <div className='ControlsWrapper'>
                <div className='Player'>
                    <audio src=""></audio>
                    <div className='Controls'>
                        <button className='PrevBtn'>
                            <i class="fa-solid fa-backward"></i>
                        </button>
                        <button className='PlayBtn'>
                            <i class="fa-solid fa-play"></i>
                        </button>
                        <button className='SkipBtn'>
                            <i class="fa-solid fa-forward"></i>
                        </button>
                    </div>
                </div>
            </div>        

            <div className='VolumeWrapper'>
                <div className='VolumeSlider'>
                    <i className='VolumeIcon'>{volumeIcon}</i>
                    <input type="range" min='0' max='100' value={volume} onChange={handleVolumeChange} className='slider'/>
                </div>
            </div>
    </div>
  )
}

export default Player