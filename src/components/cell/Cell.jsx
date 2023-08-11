import "./cell.css";
import images from "../images/images";
import { useDispatch, useSelector } from "react-redux";
import { COUNT_OPEN_TO_WIN, stages } from "../../utils/constants";
import { looseGame, winGame } from "../window/windowSlice";
import { setSmileIcon } from "../window/windowSlice";
import { setClick, toggleFlag } from "./cellsSlice";

const { cells, smiles } = images;

const Cell = ({ id }) => {
    const dispatch = useDispatch();
    const stage = useSelector((state) => state.windowState.stage);
    const cell = useSelector((state) => state.boardState.entities[id]);
    const countOpened = useSelector((state) => state.boardState.openedCells.length);

    const onCellChange = () => {
        if (stage === stages.start && cell.cellUi !== cells.flag) {
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

    const onSmileToggle = (smile) => (e) => {
        if (
            stage === stages.start &&
            e.button === 0 &&
            cell.cellUi === cells.cell
        ) {
            dispatch(setSmileIcon(smile));
        }
    };

    const onFlagToggle = (e) => {
        if (stage === stages.start) {
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
                src={cell.cellUi}
                alt="cell"
            />
        </div>
    );
};

export default Cell;
