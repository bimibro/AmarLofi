import React, { useEffect, useRef, useState } from 'react'
import './Player.css' 

const Player = ({audioSrc}) => {

    //Define the ref
    const audioRef = useRef(null); 

    //state variables to manage the players volume, status (play / pause), duration and time
    const [volume, setVolume] = useState(50);
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    //function to handle volume change
    const handleVolumeChange = (e) => {
        setVolume(e.target.value);
    };

    //function to handle play / pause status
    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev)
        if(isPlaying) {
            handlePause();
        } else {
            handlePlay()
        }
    };

    //function to handle play
    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true);
    };

    //function to handle pause
    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false)
    };
    
    //function to handle duration change
    const handleDurationChange = (e) => {
        setDuration(e.target.value);
    };

    //functions to handle slider being dragged as opposed to being clicked
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);

    const handleSeekStart = () => {
        setIsSeeking(true);
        setSeekValue(currentTime);
    };

    const handleSeekChange = (e) => {
        setSeekValue(Number(e.target.value));
    };

    const handleSeekEnd = (e) => {
        const value = Number(e.target.value);
        setIsSeeking(false);
        setCurrentTime(value);
        if (audioRef.current) {
            audioRef.current.currentTime = value;
        }
    };



    //function to update the current time and duration of the song / audio
    const handleTimeUpdate = () => {
        if (!isSeeking) {
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };



    // if statement to determine which icon to show: 

    let volumeIcon;
    if (volume == 0) {
        volumeIcon = <i className="fa-solid fa-volume-xmark"></i>;
    } else if (volume > 70) {
        volumeIcon = <i className="fa-solid fa-volume-high"></i>;
    } else {
        volumeIcon = <i class="fa-solid fa-volume-low"></i>;
    };
    


    //function to format the duration of the audio in mm:ss format
    function formatDuration(durationSeconds) {
        if (!Number.isFinite(durationSeconds)) return "0:00";
        const minutes = Math.floor(durationSeconds / 60);
        const seconds = Math.floor(durationSeconds % 60);
        const formattedSeconds = seconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    // useEffect to listen for an update in the time of the audio and then update the timer
    useEffect(() => {
        const currentVal = audioRef.current
        currentVal.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
        currentVal.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])





//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------
//ADD MORE SONGS AND SONG TITLES AND ARTIST  AND VOLUME!!! ------------------------------------------------------------------------




  return (
    <div className='PlayerWrapper'>
        <audio ref={audioRef} src={audioSrc}/>

            <div className='TitleWrapper'>
                <div className='SongTitle'>
                    <span className='Title'>Alternative Outro</span>
                    <span className='Creator'>Lucki</span>
                </div>
            </div>

            <div className='CenterWrapper'>

                <div className='ControlsWrapper'>
                    <div className='Player'>
                        <div className='Controls'>
                            <button className='PrevBtn'>
                                <i class="fa-solid fa-backward"></i>
                            </button>
                            <button className='PlayBtn' onClick={handlePlayPause}>
                                <i className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>
                            </button>
                            <button className='SkipBtn'>
                                <i class="fa-solid fa-forward"></i>
                            </button>
                        </div>
                    </div>
                </div>        
                <div className='DurationWrapper'>
                    <div className='trackDuration'>
                        <p>{formatDuration(currentTime)}</p>
                    </div>
                    <div className='DurationSlider'>
                        <input type="range" min="0" max={duration} value={isSeeking ? seekValue : currentTime} onMouseDown={handleSeekStart} onTouchStart={handleSeekStart} onChange={handleSeekChange} onMouseUp={handleSeekEnd} onTouchEnd={handleSeekEnd} className="slider"/>
                    </div>
                    <div className='SongDuration'>
                        <p>{formatDuration(duration)}</p>
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