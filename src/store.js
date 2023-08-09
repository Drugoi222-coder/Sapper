import { configureStore } from "@reduxjs/toolkit";
import cellsSlice from "./components/cell/cellsSlice";
import windowSlice from "./components/window/windowSlice";

const store = configureStore({
    reducer: {
        boardState: cellsSlice,
        windowState: windowSlice,
    },
});

export default store;