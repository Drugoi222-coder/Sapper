import "./main.css";
import { nanoid } from "@reduxjs/toolkit";
import Row from "../row/row";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCells } from "../cell/cellsSlice";

const Main = () => {
    const dispatch = useDispatch();
    const rows = useSelector((state) => state.boardState.rows);

    const renderRows = () => {
        const rowsElems = [];
        for (let i = 0; i < rows; i++) {
            rowsElems.push(<Row key={nanoid()} rowIndex={i} />);
        }
        return rowsElems;
    };

    useEffect(() => {
        dispatch(setCells());
    }, []);

    return (
        <div className="main">
            {renderRows()}
        </div>
    );
};

export default Main;
