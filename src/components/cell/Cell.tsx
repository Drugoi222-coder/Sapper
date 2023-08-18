import "./cell.css";
import images from "../images/images";
import { MouseEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { COUNT_OPEN_TO_WIN, Stages } from "../../ts/constants";
import { looseGame, winGame } from "../window/windowSlice";
import { setSmileIcon } from "../window/windowSlice";
import { setClick, toggleFlag } from "./cellsSlice";
import { ICell, IState } from "../../ts/interfaces";
const { cells, smiles } = images;

const Cell = ({ id }: { id: string }) => {
    const dispatch = useDispatch();
    const stage = useSelector<IState, Stages>(
        (state) => state.windowState.stage
    );
    const cell = useSelector<IState, ICell | undefined>(
        (state) => state.boardState.entities[id]
    );

    const countOpened = useSelector<IState, number>(
        (state) => state.boardState.openedCells.length
    );

    const onCellChange = () => {
        if (cell && stage === Stages.start && cell.cellUi !== cells.flag) {
            if (cell.isMine) {
                dispatch(looseGame(id));
                return;
            }
            dispatch(setClick(id));
            if (countOpened === COUNT_OPEN_TO_WIN) {
                dispatch(winGame());
            }
        }
    };

    const onSmileToggle = (smile: typeof smiles) => (e: MouseEvent) => {
        if (
            cell &&
            stage === Stages.start &&
            e.button === 0 &&
            cell.cellUi === cells.cell
        ) {
            dispatch(setSmileIcon(smile));
        }
    };

    const onFlagToggle = (e: MouseEvent) => {
        if (cell && stage === Stages.start) {
            e.preventDefault();
            dispatch(toggleFlag({ img: cell.cellUi, id }));
        }
    };

    return (
        <div className="cell">
            <img
                className="cell__img"
                draggable="false"
                onContextMenu={onFlagToggle}
                onMouseUp={onSmileToggle(smiles.start)}
                onMouseDown={onSmileToggle(smiles.curious)}
                onClick={onCellChange}
                src={cell?.cellUi}
                alt="cell"
            />
        </div>
    );
};

export default Cell;
