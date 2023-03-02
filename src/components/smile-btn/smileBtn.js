import "./smile-btn.css";
import images from "../images/images";
import { useContext } from "react";
import { GameInfo } from "../game-info/gameInfo";

const SmileBtn = (props) => {
    const { smiles } = images;
    const { setStart } = props;
    const { state, changers } = useContext(GameInfo);
    const {
        setBombs,
        setSmileSrc,
        setClicked,
        generateRows,
    } = changers;
    const { isStarted, smileSrc } = state;

    const onMouseDown = () => {
        generateRows();
        setSmileSrc(smiles.startPressed);
    };

    const onMouseUp = () => {
        setSmileSrc(smiles.start);
    };

    const reStart = () => {
        setStart(prev => !prev);
        setStart(prev => !prev);
    }

    const handleClick = () => {
        setBombs(40);
        if (!isStarted) {
            setStart(true);
        } else if (isStarted) {
            reStart();
            setClicked(false);
        }
    }

    return (
        <button
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            onClick={handleClick}
            className="smile-btn"
        >
            <img src={smileSrc} alt="Smile state" className="smile-btn__img" />
        </button>
    );
};

export default SmileBtn;
