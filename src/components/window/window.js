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
    const [flags, setFlags] = useState(0);
    const [bombsCount, setBombsCount] = useState({});
    const [smileSrc, setSmileSrc] = useState(smiles.start);
    const [rows, setRows] = useState([]);
    const [bombsInCells, setBombsInCells] = useState(0);
    const [minesArr, setMinesArr] = useState([]);
    const [bombsAround, setBombsAround] = useState(0);
    const [exceptIndex, setExceptIndex] = useState();
    const [activeIndex, setActiveIndex] = useState();
    const [intervalTime, setIntervalTime] = useState(0);
    const [empty, setEmpty] = useState(0);

    const arrIndexesAround = (index) => {
        const firstRowIndex = index - 16 >= 0 ? index - 16 : -100;
        const secondRowIndex = index;
        const thirdRowIndex = index + 16;
        const firstRow = [
                            firstRowIndex % 16 - 1 < 0 ? -100 : firstRowIndex - 1,
                            firstRowIndex, 
                            firstRowIndex % 16 + 1 > 15 ? -100 : firstRowIndex + 1
                        ];
        const secondRow = [
                            secondRowIndex % 16 - 1 < 0 ? -100 : secondRowIndex - 1,
                            secondRowIndex, 
                            secondRowIndex % 16 + 1 > 15 ? -100 : secondRowIndex + 1    
                        ];
        const thirdRow = [
                            thirdRowIndex % 16 - 1 < 0 ? -100 : thirdRowIndex - 1,
                            thirdRowIndex, 
                            thirdRowIndex % 16 + 1 > 15 ? -100 : thirdRowIndex + 1
                        ];
        return [
            ...firstRow,
            ...secondRow,
            ...thirdRow
            ];
    };

    const calcBombsAround = (index) => {
        if (index >= 0 && index <= 255) {
            let arrIndexesCells = arrIndexesAround(index);
            const valuesArr = [...arrIndexesCells].map(item => minesArr[item]).filter(item => item);
            const summOfBombs = valuesArr.length > 0 ? valuesArr.reduce((a,b) => a + b) : -1;
            return summOfBombs;
        }
    }

    const openAroundCells = (index) => {
        const wholeEmpties = new Set();
        const lastIndex = new Set();
    
        const createWholeEmptities = (index) => {
            const cellsAround = arrIndexesAround(index).filter(item => item >= 0);
            for (let i = 0; i < cellsAround.length; i++) {
                let bombs = calcBombsAround(cellsAround[i]);
        
                if (bombs === -1 && !lastIndex.has(cellsAround[i])) {
                    lastIndex.add(cellsAround[i]);
                    createWholeEmptities(cellsAround[i]);
                } else {
                    wholeEmpties.add(cellsAround[i]);
                }
            }
        };

        createWholeEmptities(index);
        const flatWholeEmptities = new Set(Array.from(wholeEmpties).sort((a,b) => a - b));
        return flatWholeEmptities;
    };

    const generateMines = (exceptIndex = -1) => {
        const arr = new Array(256).fill(0);
        let count = 0;
        while (count < 40 && exceptIndex >= 0) {
            const i = Math.floor(Math.random() * 256);
            if (
                    arr[i] === 0 && i !== exceptIndex &&
                    i !== exceptIndex - 1 && i !== exceptIndex + 1 &&
                    i !== exceptIndex - 17 && i !== exceptIndex - 16 &&
                    i !== exceptIndex - 15 && i !== exceptIndex + 15 &&
                    i !== exceptIndex + 16 && i !== exceptIndex + 17
                ) {
                arr[i] = 1;
                count++;
            }
        }
        setMinesArr(() => {
            setExceptIndex((exceptIndex));
            return [...arr];
        });
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
        for (let i = 0; i < 16; i++) {
            rowsArr[i] = <Row ind={i} key={i} generateCells={generateCells} />;
        }
        setRows(() => [...rowsArr]);
    };

    const gameInfoObject = {
        state: {
            isStarted,
            flags,
            seconds,
            smileSrc,
            isClicked,
            bombsInCells,
            rows,
            bombsAround,
            empty,
            minesArr,
            exceptIndex,
            activeIndex,
        },
        changers: {
            setBombsInCells,
            setFlags,
            setSmileSrc,
            setClicked,
            generateRows,
            generateMines,
            calcBombsAround,
            setActiveIndex,
            openAroundCells,
            setEmpty,
            setStart,
        },
    };

    const handleSeconds = () => {
        const interval = setInterval(() => {
            setSeconds((prev) => prev + 1);
        }, 1000);
        return interval;
    };

    const countTime = () => {
        if (seconds < 1000) {
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
        } else {
            setTime((prev) => ({
                ...prev,
                units: 9,
                dozens: 9,
                hundreds: 9,
            }));
        }
    };

    const countBombs = () => {
        let bombsArr = String(flags)
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

    const clearIntervalTime = () => {
        setIntervalTime(() => {
            clearInterval(intervalTime);
            return 0;
        });
    }

    useEffect(() => {
        if (empty === 215) {
            setStart(false);
            setClicked(false);
            clearIntervalTime();
            setSmileSrc(smiles.win);
        }
    }, [empty]);

    useEffect(() => {
        if (!isClicked) {
            setExceptIndex(undefined);
            setActiveIndex(undefined);
        }
    },[isClicked]);

    useEffect(() => {
        if (isStarted && isClicked) {
            clearIntervalTime();
            setSeconds(0);
            setIntervalTime(handleSeconds());
        } else {
            if (!isStarted) {
                clearIntervalTime();
            } else {
                clearIntervalTime();
                setSeconds(0);
            }
        }
    }, [isClicked, isStarted]);

    useEffect(() => {
        setActiveIndex(exceptIndex);
        openAroundCells(activeIndex);
        setBombsAround(calcBombsAround(exceptIndex));
    }, [minesArr]);

    useEffect(() => {
        countBombs();
    }, [flags]);

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
