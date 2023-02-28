import "./cell.css";
import images from "../images/images";
import { useState, useContext, useEffect } from "react";
import { GameInfo } from "../game-info/gameInfo";

const Cell = () => {
    const { cells } = images;
    const [ cellInfo, setCellInfo ] = useState({ src: cells.cell });
    const { state, changers } = useContext(GameInfo);
    const { isStarted, activeCells } = state;
    const { setBombs } = changers;

    const isInitial = () => {
        if (isStarted) {
            setCellInfo(prev => ({
                ...prev,
                src: cells.cell
            }));
        }
    }

    const changeCellImg = () => {
        if (isStarted) {
            setCellInfo(prev => ({
                ...prev,
                src: cells.emptycell
            }));
        }
    }

    const setFlag = (e) => {
        if (isStarted) {
            e.preventDefault();
            setBombs(prev => prev - 1);
            setCellInfo(prev => ({
                ...prev,
                src: cells.flag
            }));
        }
    }

    useEffect(() => {
        isInitial();
    }, [activeCells])

    return (
        <div className="cell">
            <img className="cell__img" onContextMenu={setFlag} onClick={changeCellImg} src={cellInfo.src} alt="cell" />
        </div>
    );
};

export default Cell;
