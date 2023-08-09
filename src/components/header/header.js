import "./header.css";
import SmileBtn from "../smile-btn/smileBtn";
import withCounter from "../counter/withCounter";
import CounterFlags from "../counter/counter-flags/counterFlags";
import CounterTimer from "../counter/counter-timer/counterTimer";

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
