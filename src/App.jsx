import {useState, useEffect} from 'react';
import backgroundImage from './assets/background.jpeg'

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const startStyles = {
    backgroundColor:"#E0FFFF",
    fontFamily:"Aerial",
    borderRadius:"2px",
    border:"none",
    marginLeft:"10px",
    padding:"2px",
    fontSize:"0.95em",
    cursor:"pointer",
    width:"60px",

  }
  const stopStyles = {
    fontFamily:"Aerial",
    backgroundColor:"#FFA500",
    borderRadius:"2px",
    border:"none",
    marginLeft:"10px",
    padding:"2px",
    fontSize:"0.95em",
    cursor:"pointer",
    color:"black",
    width:"60px",
  }

  const containerStyles = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',

  }

  document.body.style.margin = 0


  const startStopWatch = ()=>{
    setIsRunning(!isRunning)
  }

  const resetWatch = () => {
    setIsRunning(false)
    setElapsedTime(0)
    setHours(0)
    setMinutes(0)
    setSeconds(0)
  }

  useEffect(()=> {
    let intervalId;

    if(isRunning){
      intervalId = setInterval(()=>{
        setElapsedTime((prevTime)=>prevTime+1000)
        setHours(Math.floor(elapsedTime / (1000 * 60 * 60)))
        setMinutes(Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60)))
        setSeconds((Math.floor((elapsedTime % (1000 * 60)) / 1000)))
      }, 1000)
    }else{
      clearInterval(intervalId);
    }

    return ()=> clearInterval(intervalId);

  }, [isRunning, elapsedTime])
  return (
    <div style={containerStyles}>
      <div className="container">
      <h2>{hours} : {minutes} : {seconds}</h2>
      <button style={isRunning ? stopStyles : startStyles} onClick={startStopWatch}>{ isRunning ? "stop" : "start" }</button>
      <button className="reset" onClick={resetWatch}>reset</button>
    </div>
    </div>
  );
}

export default App
