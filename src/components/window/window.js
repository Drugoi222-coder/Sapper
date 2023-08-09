import "./window.css";
import Header from "../header/header";
import Main from "../main/main";
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
