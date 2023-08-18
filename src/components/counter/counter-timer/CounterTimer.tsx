import { useEffect, useState } from "react";
import { Stages } from "../../../ts/constants";
import { useSelector } from "react-redux";
import { IState } from "../../../ts/interfaces";

interface ITimer {
    value: number,
    key?: number | NodeJS.Timer,
}

const CounterTimer = ({ renderDigits }: { renderDigits: Function }) => {
    const [timer, setTimer] = useState<ITimer>({ value: 0 });
    const stage = useSelector<IState, Stages>((state) => state.windowState.stage);
    const isClicked = useSelector<IState, boolean>((state) => state.boardState.isClicked);

    const playTimer = () => {
        if (stage === Stages.start && isClicked) {
            const timerId = setInterval(
                () =>
                    setTimer((state) => ({
                        ...state,
                        value: state.value + 1,
                    })),
                1000
            );
            
            setTimer((state) => ({ ...state, key: timerId }));
        } else if (stage === Stages.win || stage === Stages.loose) {
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
