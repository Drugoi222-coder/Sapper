import './counter.css';
import images from '../images/images';

const Counter = (props) => {
    const { time, bombsCount } = props;
    const { digits } = images;
    let counterObj = time ? time : bombsCount;

    return (
        <div className="counter">
            <img src={counterObj ? digits[counterObj.hundreds] : digits[0]} alt="Zero Digit" className="counter__digit"/>
            <img src={counterObj ? digits[counterObj.dozens] : digits[0]} alt="Zero Digit" className="counter__digit"/>
            <img src={counterObj ? digits[counterObj.units] : digits[0]} alt="Zero Digit" className="counter__digit"/>
        </div>
    )
}

export default Counter;