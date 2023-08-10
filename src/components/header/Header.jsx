import "./header.css";
import SmileBtn from "../smile-btn/SmileBtn";
import withCounter from "../counter/withCounter";
import CounterFlags from "../counter/counter-flags/CounterFlags";
import CounterTimer from "../counter/counter-timer/CounterTimer";

const Timer = withCounter(CounterTimer);
const Flags = withCounter(CounterFlags);

const Header = () => {
    return (
        <div className="header">
            <Flags/>
            <SmileBtn/>
            <Timer/>
        </div>
    );
};

export default Header;
