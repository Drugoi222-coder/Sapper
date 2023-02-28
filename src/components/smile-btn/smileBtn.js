import './smile-btn.css';
import images from '../images/images';
import { useState, useContext } from "react";
import { GameInfo } from "../game-info/gameInfo";

const SmileBtn = (props) => {
    const { smiles } = images;
    const { setStart, handleTime } = props;
    const [ imageSrc, setImageSrc ] = useState(smiles.start);
    const { state, changers } = useContext(GameInfo);
    const { setBombs, setActiveCells } = changers;
    const { isStarted } = state;

    const onMouseDown = () => {
        if (isStarted) {
            setActiveCells(true);
        }
        setImageSrc(smiles.startPressed);
    }

    const onMouseUp = () => {
        if (!isStarted) {
            setBombs(40);
            handleTime();
            setStart(true);
        } else if (isStarted) {
            setActiveCells(false);
            setBombs(40);
            handleTime();
        }
        setImageSrc(smiles.start);
    }

    return (
        <button onMouseUp={onMouseUp} onMouseDown={onMouseDown} className="smile-btn">
            <img src={imageSrc} alt="Smile state" className="smile-btn__img" />
        </button>
    )
}

export default SmileBtn;