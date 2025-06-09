import React, { useState } from 'react';
import NavBar from './components/NavBar/NavBar';
import Back from './components/Back/Back';
import TaskManager from './components/TaskManager/TaskManager';
import Player from './components/Player/Player';

import './index.css'; // global styling
import './components/NavBar/NavBar.css'; // NavBar specific styling

const App = () => {
    const [darkMode, setDarkmode] = useState(false)

    const handleThemeToggle = () => {
        setDarkmode((prev) => !prev);
        document.body.classList.toggle('DarkMode');
    }

    return (
        <div className={`navbar-wrapper ${darkMode ? 'dark-mode' : ''}`}>
            <NavBar onThemeToggle={handleThemeToggle} />
            <Back mode={darkMode ? 'dark' : 'light'} /> {/* Pass mode here */}
            <TaskManager />
            <Player />
        </div>
    );
};

export default App;