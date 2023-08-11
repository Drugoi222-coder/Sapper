import "./smile-btn.css";
import images from "../images/images";
import { useDispatch, useSelector } from "react-redux";
import { startGame, setSmileIcon } from "../window/windowSlice";

const { smiles } = images;

const SmileBtn = () => {
    const dispatch = useDispatch();
    const smileIcon = useSelector((state) => state.windowState.smileImg);
    
    const onSmileMouseDown = () => dispatch(setSmileIcon(smiles.startPressed));
    const onSmileMouseUp = () => dispatch(setSmileIcon(smiles.start));
    const onSmileClick = () => dispatch(startGame());

    return (
        <button
            onMouseUp={onSmileMouseUp}
            onMouseDown={onSmileMouseDown}
            onClick={onSmileClick}
            className="smile-btn"
        >
            <img src={smileIcon} alt="Smile state" className="smile-btn__img" />
        </button>
    );
};

export default SmileBtn;
