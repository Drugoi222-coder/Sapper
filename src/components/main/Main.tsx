import "./main.css";
import { nanoid } from "@reduxjs/toolkit";
import Row from "../row/Row";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCells } from "../cell/cellsSlice";
import { IState } from "../../ts/interfaces";

const Main = () => {
    const dispatch = useDispatch();
    const rows = useSelector<IState, number>((state) => state.boardState.rows);

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

    return <div className="main">{renderRows()}</div>;
};

export default Main;
