import "./header.css";
import Counter from "../counter/counter";
import SmileBtn from "../smile-btn/smileBtn";

const Header = (props) => {
    const {setStart, handleTime, time, bombsCount } = props;
    return (
        <div className="header">
            <Counter bombsCount={bombsCount}/>
            <SmileBtn
                handleTime={handleTime}
                setStart={setStart}
            />
            <Counter time={time}/>
        </div>
    );
};

export default Header;
