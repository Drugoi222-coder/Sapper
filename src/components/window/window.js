import "./window.css";
import Header from "../header/header";
import Main from "../main/main";
import { useEffect, useState } from "react";
import { GameInfo } from "../game-info/gameInfo";
import images from "../images/images";
import Cell from "../cell/cell";
import Row from "../row/row";

const Window = () => {
    const { smiles } = images;
    const [isStarted, setStart] = useState(false);
    const [seconds, setSeconds] = useState(0);
    const [isClicked, setClicked] = useState(false);
    const [time, setTime] = useState(0);
    const [bombs, setBombs] = useState(0);
    const [bombsCount, setBombsCount] = useState({});
    const [smileSrc, setSmileSrc] = useState(smiles.start);
    const [rows, setRows] = useState([]);
    const [firstClicked, setFirstClicked] = useState([]);
    const [bombsInCells, setBombsInCells] = useState(0);
    const [minesArr, setMinesArr] = useState([]);

    const generateMines = (exceptIndex = -1) => {
        const arr = new Array(256).fill(0);
        let count = 0;
        while (count < 40 && exceptIndex) {
            const i = Math.floor(Math.random() * 256);
            if (arr[i] === 0 && i !== exceptIndex) {
                arr[i] = 1;
                count++;
            }
        }
        const arrAround = [arr[exceptIndex - 17], arr[exceptIndex - 16] , arr[exceptIndex - 15],
                            arr[exceptIndex - 1], arr[exceptIndex], arr[exceptIndex + 1],
                            arr[exceptIndex + 15], arr[exceptIndex + 16], arr[exceptIndex + 17]];
        setMinesArr([...arr]);
        return arrAround.reduce((a,b) => a + b) - 1;
    };

    const generateCells = (ind) => {
        const cells = [];
        for (let i = 0; i < 16; i++) {
            cells[i] = <Cell rowInd={ind} ind={i} key={i} />;
        }
        return [...cells];
    };

    const generateRows = () => {
        const rowsArr = [];
        for (let i = 0; i < 16; i++){
            rowsArr[i] = <Row ind={i} key={i} generateCells={generateCells}/>;
        }
        setRows(() => ([...rowsArr]));
    }


    const gameInfoObject = {
        state: {
            isStarted,
            bombs,
            seconds,
            smileSrc,
            isClicked,
            bombsInCells,
            rows,
            firstClicked,
            minesArr
        },
        changers: {
            setBombsInCells,
            setBombs,
            setSmileSrc,
            setClicked,
            generateRows,
            generateMines,
            setFirstClicked
        },
    };

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
        let secondsArr = String(seconds)
            .split("")
            .reverse()
            .map((item) => +item);
        setTime((prev) => ({
            ...prev,
            units: secondsArr[0] || 0,
            dozens: secondsArr[1] || 0,
            hundreds: secondsArr[2] || 0,
        }));
    };

    const countBombs = () => {
        let bombsArr = String(bombs)
            .split("")
            .reverse()
            .map((item) => +item);
        setBombsCount((prev) => ({
            ...prev,
            units: bombsArr[0] || 0,
            dozens: bombsArr[1] || 0,
            hundreds: 0,
        }));
    };

    useEffect(() => {
        countBombs();
    }, [bombs]);

    useEffect(() => {
        countTime();
    }, [seconds]);

    return (
        <div className="window">
            <GameInfo.Provider value={gameInfoObject}>
                <Header
                    bombsCount={bombsCount}
                    handleTime={handleSeconds}
                    setStart={setStart}
                    time={time}
                />
                <Main />
            </GameInfo.Provider>
        </div>
    );
};

export default Window;
