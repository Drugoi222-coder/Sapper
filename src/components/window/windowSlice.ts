import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { COUNT_MINES, Stages } from "../../ts/constants";
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
            state.stage = Stages.start;
            state.flagsCount = COUNT_MINES;
        },
        setSmileIcon: (state, action) => {
            state.smileImg = action.payload;
        },
        winGame: (state) => {
            state.stage = Stages.win;
            state.smileImg = smiles.win;
        },
        looseGame: (state, action: PayloadAction<string>) => {
            state.stage = Stages.loose;
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

export const { startGame, setSmileIcon, looseGame, winGame } =
    windowSlice.actions;
export default windowSlice.reducer;
