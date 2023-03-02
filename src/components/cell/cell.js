import "./cell.css";
import images from "../images/images";
import { useState, useContext, useEffect } from "react";
import { GameInfo } from "../game-info/gameInfo";

const Cell = (props) => {
    const { ind, rowInd } = props;
    const { cells, smiles, bombs: bombsImgs, bombCount } = images;
    const [cellInfo, setCellInfo] = useState({
        src: cells.cell,
        index: rowInd * 16 + ind,
    });
    const [lastIndex, setLastIndex] = useState(undefined);
    const { state, changers } = useContext(GameInfo);
    const { isStarted, bombs, isClicked, minesArr, bombsAround, activeIndex } =
        state;
    const {
        setBombs,
        setSmileSrc,
        setClicked,
        generateMines,
        calcBombsAround,
        setActiveIndex,
        openAroundCells,
        setStart,
    } = changers;

    const isInitial = () => {
        if (isStarted && !isClicked) {
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
                setStart(false);
                setSmileSrc(smiles.loose);
                setClicked(false);
                setLastIndex(cellInfo.index);
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
        if (isStarted && !cellInfo.flag && cellInfo.src !== cells.emptycell) {
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
        if (
            toOpenCells.has(cellInfo.index) &&
            minesArr[cellInfo.index] !== 1 &&
            bombsCountActive === -1 &&
            cellInfo.flag !== "flag" &&
            cellInfo.flag !== "question"
        ) {
            let bombsAround = calcBombsAround(cellInfo.index);
            setBombCount(bombsAround);
        }
    }, [activeIndex]);

    useEffect(() => {
        isInitial();
        if (!isStarted && !isClicked && minesArr.length > 0) {
            const mines = new Set(
                minesArr
                    .map((item, index) => (item === 1 ? index : ""))
                    .filter((item) => item)
            );
            if (mines.has(cellInfo.index) && lastIndex !== cellInfo.index && cellInfo.flag !== "flag") {
                setCellInfo((prev) => ({
                    ...prev,
                    src: bombsImgs.bombOpened,
                }));
            } else if (!mines.has(cellInfo.index) && cellInfo.flag === "flag") {
                setCellInfo((prev) => ({
                    ...prev,
                    src: bombsImgs.wrong,
                }));
            }
        }
    }, [isStarted, isClicked]);

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
