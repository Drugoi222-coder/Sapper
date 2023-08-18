import { useSelector } from "react-redux";
import { IState } from "../../../ts/interfaces";

const CounterFlags = ({ renderDigits }: { renderDigits: Function }) => {
    const flagsCount = useSelector<IState, number>((state) => state.windowState.flagsCount);

    return <div className="counter">{renderDigits(flagsCount)}</div>;
};

export default CounterFlags;
