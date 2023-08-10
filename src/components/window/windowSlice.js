import { createSlice } from "@reduxjs/toolkit";
import { stages } from "../../utils/constants";
import images from "../images/images";
import { toggleFlag } from "../cell/cellsSlice";

const { smiles, cells } = images;

const initialState = {
    stage: "",
    flagsCount: 0,
    smileImg: smiles.start,
};

const windowSlice = createSlice({
    name: "windowState",
    initialState,
    reducers: {
        startGame: (state) => {
            state.stage = stages.start;
            state.flagsCount = 40;
        },
        setSmileIcon: (state, action) => {
            state.smileImg = action.payload;
        },
        winGame: (state) => {
            state.stage = stages.win;
            state.smileImg = smiles.win;
        },
        looseGame: (state) => {
            state.stage = stages.loose;
            state.smileImg = smiles.loose;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(toggleFlag, (state, { payload }) => {
            if (payload.img === cells.question) {
                state.flagsCount += 1;
            } else if (payload.img === cells.cell) {
                state.flagsCount -= 1;
            }
        });
    },
});

export const { startGame, finishGame, setSmileIcon, looseGame, winGame } =
    windowSlice.actions;
export default windowSlice.reducer;
