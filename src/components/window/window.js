import "./window.css";
import Header from "../header/header";
import Main from "../main/main";
import { useEffect, useState } from "react";

const Window = () => {
    const [isStarted, setStart] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [time, setTime] = useState(0);
    const [bombs, setBombs] = useState(0);
    const [bombsCount, setBombsCount ] = useState({});

    const handleSeconds = () => {
        const plusSecond = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        if (plusSecond && isStarted) {
            clearInterval(plusSecond);
            setSeconds(0);
        }
    };

    const countTime = () => {
        let secondsArr = String(seconds).split("").reverse().map(item => +item);
        setTime(prev => ({
            ...prev,
            units: secondsArr[0] || 0,
            dozens: secondsArr[1] || 0,
            hundreds: secondsArr[2] || 0
        }));
    };
    
    const countBombs = () => {
        let bombsArr = String(bombs).split("").reverse().map(item => +item);
        setBombsCount(prev => ({
            ...prev,
            units: bombsArr[0] || 0,
            dozens: bombsArr[1] || 0,
            hundreds: 0
        }));
    }

    useEffect(() => {
        countBombs();
    },[bombs]);

    useEffect(() => {
        countTime();
    },[seconds]);

    return (
        <div className="window">
            <Header
                bombsCount={bombsCount}
                setBombs={setBombs}
                isStarted={isStarted}
                handleTime={handleSeconds}
                setStart={setStart}
                time={time}
            />
            <Main />
        </div>
    );
};

export default Window;
