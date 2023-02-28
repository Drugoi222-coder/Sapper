import "./smile-btn.css";
import images from "../images/images";
import { useContext } from "react";
import { GameInfo } from "../game-info/gameInfo";

const SmileBtn = (props) => {
    const { smiles } = images;
    const { setStart, handleTime } = props;
    const { state, changers } = useContext(GameInfo);
    const {
        setBombs,
        setSmileSrc,
        setClicked,
        generateRows,
        setFirstClicked,
    } = changers;
    const { isStarted, smileSrc } = state;

    const onMouseDown = () => {
        generateRows();
        setSmileSrc(smiles.startPressed);
    };

    const onMouseUp = () => {
        if (!isStarted) {
            setBombs(40);
            handleTime();
            setStart(true);
        } else if (isStarted) {
            setFirstClicked([]);
            setClicked(false);
            setBombs(40);
            handleTime();
        }
        setSmileSrc(smiles.start);
    };

    return (
        <button
            onMouseUp={onMouseUp}
            onMouseDown={onMouseDown}
            className="smile-btn"
        >
            <img src={smileSrc} alt="Smile state" className="smile-btn__img" />
        </button>
    );
};

export default SmileBtn;
