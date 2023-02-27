import "./cell.css";
import images from "../images/images";
import { useState } from "react";

const Cell = () => {
    const { cells } = images;
    const [activeCell, setActiveCell] = useState(cells.cell);

    const changeCellImg = () => {
        setActiveCell(cells.emptycell);
    }

    return (
        <div className="cell">
            <img className="cell__img" onClick={changeCellImg} src={activeCell} alt="cell" />
        </div>
    );
};

export default Cell;
