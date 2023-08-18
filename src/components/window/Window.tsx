import "./window.css";
import Header from "../header/Header";
import Main from "../main/Main";
import { Provider } from "react-redux";
import store from "../../store";

const Window = () => {
    return (
        <div className="window">
            <Provider store={store}>
                <Header />
                <Main />
            </Provider>
        </div>
    );
};

export default Window;
