import React, {useState, useRef} from 'react'
import './TaskManager.css' // TaskBar specific styling

const TaskManager = () => {
  const [show, setShow] = useState(false);
// variables for timer:
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');
  const [timeLeft, setTimeLeft] = useState(null);
  const timerRef = useRef(null);

  //pause
  const [isPaused, setIsPaused] = useState(false);

//converting time input to total seconds: 

  const getTotalSeconds =() => {
    return (
      (parseInt(hours || 0, 10) * 3600)  + //converting hours to seconds by parsing hours as int and multiplying by 3600
      (parseInt(minutes || 0, 10) * 60 ) + //converting minutes to seconds by parsing minutes as int and multiplying by 60
      (parseInt(seconds || 0, 10)) //no conversion needed for seconds
    );
  };

  const startTimer = () => {
    const total = getTotalSeconds();
    if (total >0){
      setTimeLeft(total);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current); //clear any existing timer
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1){
            clearInterval(timerRef.current);
            return 0; //stop timer when it reaches 0
          }
          return prev - 1; //decrement time left by 1 second
        });
      }, 1000); //update every second
    }
  };

  //formating time for display;

  const formatTime = (secs) => {
    const h = String(Math.floor(secs / 3600)).padStart(2, '0'); //calculating hours and padding with 0
    const m = String(Math.floor((secs % 3600) / 60)).padStart(2, '0'); //calculating minutes and padding with 0
    const s = String(secs % 60).padStart(2, '0'); //calculating seconds and padding with 0
    return `${h}:${m}:${s}`; //returning formatted time
  };

  //cleanup on unmount
  React.useEffect( () => {
    return () => clearInterval(timerRef.current);
  }, []);


  //pause handler
  const pauseTimer = () => {
    setIsPaused(true);
    if (timerRef.current) clearInterval(timerRef.current); //clear the timer
  };

  //resume handler

  const resumeTimer = () => {
    setIsPaused(false);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      }, );
    }, 1000);
  };

  //cancel handler

  const cancelTimer =() => {
    setTimeLeft(null);
    setIsPaused(false);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <div className='TaskManagerWrap'>
      <div className='TaskManagerButton'>
        <button onClick={() => setShow(!show)}>
          <i id='TaskManagerButton' class="fa-solid fa-stopwatch"></i>
        </button>
      </div>

      <div className="TaskManagerContent">
        <div className={`TaskManagerContentAppear${show ? ' show' : ''}`}>
          <h4>Study Mode</h4>

          <div className='CountDownWrapper'>
              <div className='InputNotOn'>
                <input className="number-input" type="number" max="24" min="0" placeholder='00' value={hours} onChange={e => setHours(e.target.value)} disabled={timeLeft !== null}></input> 
                <input className="number-input" type="number" max="60" min="0" placeholder='00' value={minutes} onChange={e => setMinutes(e.target.value)} disabled={timeLeft !== null}></input>
                <input className="number-input" type="number" max="60" min="0" placeholder='00' value={seconds} onChange={e => setSeconds(e.target.value)} disabled={timeLeft !== null}></input>
              </div>

              <div className='buttonTimerWrapper'>
                <button className='buttonTimer' id='CountDownSubmit' onClick={startTimer} disabled={timeLeft !== null}>Set Timer</button>
              </div>
              {timeLeft !== null && (
                <div className='TimerDisplay'>
                  {formatTime(timeLeft)}
                  <div className='TimerControls'>
                    {!isPaused ? (
                      <button onClick={pauseTimer}>Pause</button>
                    ) : (
                      <button onClick={resumeTimer}>Resume</button>
                    )}
                    <button onClick={cancelTimer}>Cancel</button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskManager