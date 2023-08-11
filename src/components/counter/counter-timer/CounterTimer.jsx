import { useEffect, useState } from "react";
import { stages } from "../../../utils/constants";
import { useSelector } from "react-redux";

const CounterTimer = ({ renderDigits }) => {
    const [timer, setTimer] = useState({ value: 0, key: null });
    const stage = useSelector((state) => state.windowState.stage);
    const isClicked = useSelector((state) => state.boardState.isClicked);

    const playTimer = () => {
        if (stage === stages.start && isClicked) {
            const timerId = setInterval(
                () =>
                    setTimer((state) => ({
                        ...state,
                        value: state.value + 1,
                    })),
                1000
            );
            
            setTimer((state) => ({ ...state, key: timerId }));
        } else if (stage === stages.win || stage === stages.loose) {
            clearInterval(timer.key);
        } else {
            setTimer((state) => ({...state, value: 0}));
            clearInterval(timer.key);
        }
    };

    useEffect(() => {
        playTimer();
    }, [stage, isClicked]);

    return <div className="counter">{renderDigits(timer.value)}</div>;
};

export default CounterTimer;
