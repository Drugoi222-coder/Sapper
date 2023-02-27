import './smile-btn.css';
import images from '../images/images';
import { useState } from 'react';

const SmileBtn = (props) => {
    const { smiles } = images;
    const { setStart, handleTime, isStarted, setBombs } = props;
    const [ imageSrc, setImageSrc ] = useState(smiles.start);

    const onMouseDown = () => {
        setImageSrc(smiles.startPressed);
    }

    const onMouseUp = () => {
        if (!isStarted) {
            setBombs(40);
            handleTime();
            setStart(true);
        } else if (isStarted) {
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