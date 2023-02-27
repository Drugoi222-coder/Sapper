import "./header.css";
import Counter from "../counter/counter";
import SmileBtn from "../smile-btn/smileBtn";

const Header = (props) => {
    const { isStarted, setStart, handleTime, time, bombsCount, setBombs } = props;
    return (
        <div className="header">
            <Counter bombsCount={bombsCount} isStarted={isStarted} />
            <SmileBtn
                setBombs={setBombs}
                isStarted={isStarted}
                handleTime={handleTime}
                setStart={setStart}
            />
            <Counter time={time}/>
        </div>
    );
};

export default Header;
