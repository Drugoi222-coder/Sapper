import "./cell.css";
import images from "../images/images";
import { useState, useContext, useEffect } from "react";
import { GameInfo } from "../game-info/gameInfo";

const Cell = (props) => {
    const { ind, rowInd } = props;
    const [ activeIndex, setActiveIndex ] = useState();
    const { cells, smiles, bombs: bombsImgs, bombCount } = images;
    const [cellInfo, setCellInfo] = useState({
        src: cells.cell,
        index: rowInd * 16 + ind,
    });
    const { state, changers } = useContext(GameInfo);
    const { isStarted, bombs, isClicked, rows, minesArr } = state;
    const { setBombs, setSmileSrc, setClicked, generateMines } = changers;

    const isInitial = () => {
        if (isStarted) {
            setCellInfo((prev) => ({
                ...prev,
                src: cells.cell,
                flag: false
            }));
        }
    };

    const calcBombsAround = () => {
        let middleRow = cellInfo.index;
        let firstRow = cellInfo.index - 16;
        let lastRow = cellInfo.index + 16;
        let arrIndexesCells = [firstRow - 1, firstRow, firstRow + 1,
                                middleRow - 1, middleRow, middleRow + 1,
                                lastRow - 1, lastRow, lastRow + 1];
        arrIndexesCells = arrIndexesCells.map(item => minesArr[item]);
        return arrIndexesCells.reduce((a,b) => a + b);
    }

    const changeCellImg = (e) => {
        if (isStarted && (cellInfo.flag === "flag" || cellInfo.flag === "question")) {
            e.preventDefault();
        } else if (!isClicked && isStarted) {
            setActiveIndex(cellInfo.index);
            let bombs = generateMines(cellInfo.index);
            if (bombs === -1) {
                setCellInfo((prev) => ({
                    ...prev,
                    src: cells.emptycell,
                }));
            } else {
                setCellInfo((prev) => ({
                    ...prev,
                    src: bombCount[bombs],
                }));
            }
            setClicked(true);
        } else if (isStarted) {
            if (minesArr[cellInfo.index] === 1) {
                setCellInfo((prev) => ({
                    ...prev,
                    src: bombsImgs.explode,
                }));
            } else {
                let bombs = calcBombsAround();
                if (bombs === 0) {
                    setCellInfo((prev) => ({
                        ...prev,
                        src: cells.emptycell,
                    }));
                } else {
                    setCellInfo((prev) => ({
                        ...prev,
                        src: bombCount[bombs - 1],
                    }));
                }
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
