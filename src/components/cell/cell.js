import "./cell.css";
import images from "../images/images";
import { useState, useContext, useEffect } from "react";
import { GameInfo } from "../game-info/gameInfo";
import { act } from "react-dom/test-utils";

const Cell = (props) => {
    const { ind, rowInd } = props;
    const { cells, smiles, bombs: bombsImgs, bombCount } = images;
    const [ cellInfo, setCellInfo ] = useState({
        src: cells.cell,
        index: rowInd * 16 + ind,
    });
    const { state, changers } = useContext(GameInfo);
    const {
        isStarted,
        bombs,
        isClicked,
        rows,
        minesArr,
        bombsAround,
        activeIndex
    } = state;
    const {
        setBombs,
        setSmileSrc,
        setClicked,
        generateMines,
        calcBombsAround,
        setActiveIndex,
        openAroundCells
    } = changers;

    const isInitial = () => {
        if (isStarted) {
            setCellInfo((prev) => ({
                ...prev,
                src: cells.cell,
                flag: false,
            }));
        }
    };

    const setBombCount = (bombsValue) => {
        if (bombsValue === -1) {
            setCellInfo((prev) => ({
                ...prev,
                src: cells.emptycell,
            }));
        } else {
            setCellInfo((prev) => ({
                ...prev,
                src: bombCount[bombsValue - 1],
            }));
        }
    };

    const changeCellImg = (e) => {
        if (
            isStarted &&
            (cellInfo.flag === "flag" || cellInfo.flag === "question")
        ) {
            e.preventDefault();
        } else if (!isClicked && isStarted) {
            generateMines(cellInfo.index);
            setBombCount(bombsAround);
            setClicked(true);
        } else if (isStarted) {
            if (minesArr[cellInfo.index] === 1) {
                setCellInfo((prev) => ({
                    ...prev,
                    src: bombsImgs.explode,
                }));
            } else {
                setActiveIndex(() => cellInfo.index);
                let bombs = calcBombsAround(cellInfo.index);
                setBombCount(bombs);
            }
        }
    };

    const setFlag = (e) => {
        if (isStarted || cellInfo.flag === "noflag") {
            e.preventDefault();
        }
        if (isStarted && !cellInfo.flag) {
            if (bombs > 0) {
                setBombs((prev) => prev - 1);
                setCellInfo((prev) => ({
                    ...prev,
                    src: cells.flag,
                    flag: "flag",
                }));
            }
        } else if (isStarted && cellInfo.flag === "flag") {
            setCellInfo((prev) => ({
                ...prev,
                src: cells.question,
                flag: "question",
            }));
        } else if (isStarted && cellInfo.flag === "question") {
            setBombs((prev) => prev + 1);
            setCellInfo((prev) => ({
                ...prev,
                src: cells.cell,
                flag: false,
            }));
        }
    };

    const onCurious = (e) => {
        if (isStarted && e.button === 0 && !cellInfo.flag) {
            setSmileSrc(smiles.curious);
        }
    };

    const onDetect = () => {
        if (isStarted) {
            setSmileSrc(smiles.start);
        }
    };

    useEffect(() => {
        const toOpenCells = openAroundCells(activeIndex);
        const bombsCountActive = calcBombsAround(activeIndex);
        if (toOpenCells.has(cellInfo.index) && minesArr[cellInfo.index] !== 1 && bombsCountActive === -1) {
            let bombsAround = calcBombsAround(cellInfo.index);
            setBombCount(bombsAround);
        }
    }, [activeIndex]);

    useEffect(() => {
        isInitial();
    }, [rows]);

    return (
        <div className="cell">
            <img
                className="cell__img"
                draggable="false"
                onContextMenu={setFlag}
                onMouseUp={onDetect}
                onMouseDown={onCurious}
                onClick={changeCellImg}
                src={cellInfo.src}
                alt="cell"
            />
        </div>
    );
};

export default Cell;
