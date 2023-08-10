import { useSelector } from "react-redux";

const CounterFlags = ({ renderDigits }) => {
    const flagsCount = useSelector((state) => state.windowState.flagsCount);

    return <div className="counter">{renderDigits(flagsCount)}</div>;
};

export default CounterFlags;
