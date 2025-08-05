/*react and usestate import. other elements of the page imported.*/
import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Back from './components/Back/Back';
import TaskManager from './components/TaskManager/TaskManager';
import Player from './components/Player/Player';

import './index.css'; // global styling
import './components/NavBar/NavBar.css'; // NavBar specific styling

/*array of songs for the program to use.*/
const songs = [
    {    
        title: "Upon Rest",
        artist: "LOFIRU",
        src: './audio/UponRest.mp3'
    }, //https://www.youtube.com/@lofiru6017
    {
        title: "Pudding",
        artist: "LOFIRU",
        src: './audio/pudding.mp3' 
    }, //https://www.youtube.com/@lofiru6017
    {
        title: "Can't Fall In Love",
        artist: "Supapao",
        src: './audio/Cant Fall In Love.mp3' 
    }, //https://www.youtube.com/watch?v=VZkFJAb_gx4&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=14
    {
        title: "Blue Boi",
        artist: "Lakey Inspired",
        src: './audio/Blue Boi.mp3' 
    }, //www.youtube.com/watch?v=wnOoqdcf7zU&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=10
    {
        title: "4am",
        artist: "KaizanBlu",
        src: './audio/4am.mp3' 
    }, //www.youtube.com/watch?v=wnOoqdcf7zU&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=10
    {
        title: "And So It Begins",
        artist: "Artificial.Music",
        src: './audio/And So It Begins.mp3' 
    }, //https://www.youtube.com/watch?v=BH-SnQ8J1VU&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=1
    {
        title: "Path Of The Fireflies",
        artist: "AERØHEAD",
        src: './audio/Path Of The Fireflies.mp3' 
    }, //https://www.youtube.com/watch?v=sJyO-By_9wc&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=17
    {
        title: "Lost Memories",
        artist: "AERØHEAD",
        src: './audio/Lost Memories.mp3' 
    },]; //https://www.youtube.com/watch?v=C11iclSJTNA&list=PLfP6i5T0-DkIMLNRwmJpRBs4PJvxfgwBg&index=21

const App = () => {
    const [darkMode, setDarkmode] = useState(false);
    const [currentSong, setCurrentSong] = useState(0);
    // handler for the theme toggle. it will set darkmode from false to true and vice versa.
    const handleThemeToggle = () => {
        setDarkmode((prev) => !prev);
        document.body.classList.toggle('DarkMode'); // toggles darkmode
    }

    // handlers to go to the next and previous songs in the array.
    const handleNextSong = () => {
        setCurrentSong((prev) => (prev + 1) % songs.length);
    };
    const handlePrevSong = () => {
        setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    };
    return (
        //the main wrapper for the app.
        <div className={`navbar-wrapper ${darkMode ? 'dark-mode' : ''}`}>
            <NavBar onThemeToggle={handleThemeToggle} />
            <Back mode={darkMode ? 'dark' : 'light'} /> {/* Pass mode here */}
            <TaskManager />
            <Player
            // the player component for the audio player. 
                audioSrc={songs[currentSong].src}
                title={songs[currentSong].title}
                artist={songs[currentSong].artist}
                onNext={handleNextSong}
                onPrev={handlePrevSong}
            />  
        </div>
    );
};

export default App;