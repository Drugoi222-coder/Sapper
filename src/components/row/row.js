import "./row.css";
import { useEffect, useState } from "react";

const Row = (props) => {
    const { ind, generateCells } = props;
    const [cells, setCells] = useState([]);

    useEffect(() => {
        setCells(() => ([
            ...generateCells(ind)
        ]));
    }, [generateCells, ind]);

    return (
        <div className="row">
            {cells}
        </div>
    );
};

export default Row;
