import './grid-cell.css';
import { useEffect, useContext } from 'react';
import { GameInfo } from "../game-info/gameInfo";


const GridCell = () => {
    const { state, changers } = useContext(GameInfo);
    const { rows } = state;
    const { generateRows } = changers;

    useEffect(() => {
        generateRows();
    },[]);

    return (
        <div className="grid-cell">
            {rows}
        </div>
    )
}

export default GridCell;