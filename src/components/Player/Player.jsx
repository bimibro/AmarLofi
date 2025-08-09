// importing react elements and styling for the page.
import React, { useEffect, useRef, useState } from 'react'
import './Player.css' 


//defining a react functional component which accepts props for audiosrc, title, artist, onnext and onprev and renders them.
const Player = ({audioSrc, title, artist, onNext, onPrev}) => {

    //Define the ref
    const audioRef = useRef(null); 

    //state variables to manage the players volume, status (play / pause), duration and time
    const [volume, setVolume] = useState(30); // the default is 30.
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0); //default is set to 0
    const [currentTime, setCurrentTime] = useState(0);

    //function to handle volume change
    const handleVolumeChange = (e) => {
        setVolume(e.target.value); // changes the volume to the value that the user targets using the slider.
    };

    //function to handle the volume icons changes on click  
    const handleVolumeOnclick = () => {
        setVolume(0);
        if(volume === 0) {
            setVolume(30);
        }
    }

    //function to handle play / pause status
    const handlePlayPause = () => {
        setIsPlaying((prev) => !prev) // if the song is playing the button will pause it and vice versa 
        if(isPlaying) {
            handlePause();
        } else {
            handlePlay()
        }
    };

    //function to handle play
    const handlePlay = () => {
        audioRef.current.play();
        setIsPlaying(true); // playing the audio by setting the isplaying to true.
    };

    //function to handle pause
    const handlePause = () => {
        audioRef.current.pause();
        setIsPlaying(false) // pausing the audio by setting isplaying to false.
    };
    
    //function to handle duration change
    const handleDurationChange = (e) => {
        setDuration(e.target.value); // this will set the duration of the audio to the value of the targer as set by the user using the slider
    };

    //functions to handle slider being dragged as opposed to being clicked
    const [isSeeking, setIsSeeking] = useState(false);
    const [seekValue, setSeekValue] = useState(0);

    const handleSeekStart = () => {
        setIsSeeking(true);// this sets is seeking to true when the user drags the slider.
        setSeekValue(currentTime);
    };

    const handleSeekChange = (e) => {
        setSeekValue(Number(e.target.value)); // sets the seek value to the number the slider is on 
    };

    const handleSeekEnd = (e) => {
        const value = Number(e.target.value); //stores the value of the slider in a variable named value
        setIsSeeking(false); // handles the end of the seek by setting is seeking to false.
        setCurrentTime(value); // sets current time to value
        if (audioRef.current) { //if the audioref is current then set the audio current time to the value of the slider.
            audioRef.current.currentTime = value;
        }
    };



    //function to update the current time and duration of the song / audio
    const handleTimeUpdate = () => {
        if (!isSeeking) { // using the isseeking state variable. 
            //if the user is not seeking, then set the time and duration of the audio to the current time and duration of the audio (as it increments)
            setCurrentTime(audioRef.current.currentTime);
            setDuration(audioRef.current.duration);
        }
    };



    // if statement to determine which icon to show: 

    let volumeIcon;
    if (volume == 0) { // if the volume is 0, then show the volume off icon
        volumeIcon = <i className="fa-solid fa-volume-xmark"></i>;
        //if the volume is > 70 then show the high volume icon
    } else if (volume > 70) {
        volumeIcon = <i className="fa-solid fa-volume-high"></i>;
        //otherwise (else), if the volume is not 0 or > 70 (if its between 0 and 70), display the low volume icon.
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
        const currentVal = audioRef.current //get the current value of the audio ref
        currentVal.addEventListener('timeupdate', handleTimeUpdate) // adds an event listener to the current value of the audio which listens for any update
                                                                    // and which then calls handletimeupdate to update the current time and duration of the audio.
        return () => { //function to remove the event listener when the components unmounts.
        currentVal.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [])

    // useEffect to set the volume of the audio
    useEffect(() => {
        if (audioRef.current) { // if the audio ref exists (if it is..)
            audioRef.current.volume = volume / 100; //sets the audioref current volume to the value of the volume state variable but / by 100 to convert to a decimal.
        }
    }, [volume])

    // useEffect to make the song automatically play when the source is changed
    const hasMounted = useRef(false); // useref to track if the component has mounted.

    useEffect(() => {
        if (!hasMounted.current) { // if the component has not mounted:
            hasMounted.current = true;//then set the hasmounted to true so that it does not run again.
            return; // Don't play on initial mount
        }
        if (audioRef.current) { // if the audio ref exists, then set the audio source to the audio src prop passed to the component.
            audioRef.current.load();//reloads the audio element to apply the new source.
            audioRef.current.play();//plays audio
            setIsPlaying(true); // set is playing to true .
        }
    }, [audioSrc]);

  return ( //html elements of the component
    <div className='PlayerWrapper'> {/*the wrapper div for the player*/}
        <audio ref={audioRef} src={audioSrc}/> {/*sources of the audio ref and src.*/}

            {/*wrapper for the song title. it will display the title and the artist of the song by grabbing them from the array.*/}
            <div className='TitleWrapper'>
                <div className='SongTitle'>
                    <span className='Title'>{title}</span>
                    <span className='Creator'>{artist}</span>
                </div>
            </div>
            {/*wrapper for the center controls*/}
            <div className='CenterWrapper'>
                {/*wrapper for the controls*/}
                <div className='ControlsWrapper'>
                    <div className='Player'> {/*wrapper for the buttons*/}
                        <div className='Controls'>
                            <button className='PrevBtn' onClick={onPrev}> {/*call the onPrev function on click to go back a song*/}
                                <i class="fa-solid fa-backward"></i>{/*icon*/}
                            </button>
                            <button className='PlayBtn' onClick={handlePlayPause}>{/*call the handlePlayPause function on click to play/pause the song*/}
                                <i className={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}></i>{/*icons change depending on the state of isplaying (pause/play)*/} 
                            </button>
                            <button className='SkipBtn' onClick={onNext}>{/*call the onNext function on click to skip a song.*/}
                                <i class="fa-solid fa-forward"></i>{/*icon*/}
                            </button>
                        </div>
                    </div>
                </div>        
                {/*duration wrapper.*/}
                <div className='DurationWrapper'>
                    <div className='trackDuration'>{/*formatting and displaying the current time of the song using the formatDuration function.*/}
                        <p>{formatDuration(currentTime)}</p>
                    </div>
                    <div className='DurationSlider'> {/*using the seek functions to display and add functionality to the duration slider.*/}
                        <input type="range" min="0" max={duration} value={isSeeking ? seekValue : currentTime} onMouseDown={handleSeekStart} onTouchStart={handleSeekStart} onChange={handleSeekChange} onMouseUp={handleSeekEnd} onTouchEnd={handleSeekEnd} className="slider"/>
                    </div>
                    <div className='SongDuration'>{/*formatting and displaying the song duration.*/}
                        <p>{formatDuration(duration)}</p>
                    </div>
                </div>
            </div>
            {/*volume wrapper*/}
            <div className='VolumeWrapper'>
                <div className='VolumeSlider'>{/*wrapper for the slider.*/}
                    <i className='VolumeIcon' onClick={handleVolumeOnclick}>{volumeIcon}</i> {/*the volume icon will change depending on the state of the volume using onclick with the handlevilumeonclick function*/}
                    <input type="range" min='0' max='100' value={volume} onChange={handleVolumeChange} className='slider'/>{/*displaying and adding functionality to the volume slider using handleviluemchange function*/}
                </div>
            </div>
    </div>
  )
}

export default Player
