import "./cell.css";
import images from "../images/images";
import { useDispatch, useSelector } from "react-redux";
import { stages } from "../../utils/constants";
import { looseGame, winGame } from "../window/windowSlice";
import { setSmileIcon } from "../window/windowSlice";
import { setClick, toggleFlag } from "./cellsSlice";

const { cells, smiles } = images;

const Cell = ({ id }) => {
    const dispatch = useDispatch();
    const stage = useSelector((state) => state.windowState.stage);
    const minesSet = useSelector((state) => state.boardState.minesSet);
    const cell = useSelector((state) => state.boardState.entities[id]);
    const countToOpen = useSelector((state) => state.boardState.countToOpen);

    const changeCellImg = () => {
        if (stage === stages.start && cell.cellUi !== cells.flag) {
            if (minesSet.find((item) => item === id)) {
                dispatch(looseGame(id));
                return;
            }
            dispatch(setClick(id));
            if (countToOpen === 0) {
                dispatch(winGame());
                return;
            }
        }
    };

    const toggleCurious = (smile) => (e) => {
        if (
            stage === stages.start &&
            e.button === 0 &&
            cell.cellUi === cells.cell
        ) {
            dispatch(setSmileIcon(smile));
        }
    };

    const handleFlag = (e) => {
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
                onContextMenu={handleFlag}
                onMouseUp={toggleCurious(smiles.start)}
                onMouseDown={toggleCurious(smiles.curious)}
                onClick={changeCellImg}
                src={cell.cellUi}
                alt="cell"
            />
        </div>
    );
};

export default Cell;
