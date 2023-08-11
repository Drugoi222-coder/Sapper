import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { looseGame, startGame } from "../window/windowSlice";
import { generateMines, openBombs, openCells, setInitialBoardState } from "../../utils/utils";
import images from "../images/images";
import { COUNT_COLUMNS, COUNT_ROWS } from "../../utils/constants";
const { cells: cellImgs, bombs } = images;

const cellsAdapter = createEntityAdapter();
const initialState = cellsAdapter.getInitialState({
    rows: COUNT_ROWS,
    columns: COUNT_COLUMNS,
    minesSet: [],
    openedCells: [],
});

const cellsSlice = createSlice({
    name: "boardState",
    initialState,
    reducers: {
        setCells: (state) => {
            const cells = [];
            for (let rowIndex = 0; rowIndex < state.rows; rowIndex++) {
                for (
                    let columnIndex = 0;
                    columnIndex < state.columns;
                    columnIndex++
                ) {
                    cells.push({
                        id: nanoid(),
                        row: rowIndex,
                        column: columnIndex,
                        cellUi: cellImgs.cell,
                    });
                }
            }
            cellsAdapter.setAll(state, cells);
        },
        setClick: (state, { payload }) => {
            if (!state.isClicked) {
                generateMines(payload, state);
                state.isClicked = true;
            }
            if (state.entities[payload].cellUi === cellImgs.cell) {
                openCells(payload, state);
            }
        },
        toggleFlag: (state, { payload }) => {
            const { id } = payload;
            const entity = state.entities[id];
            if (entity.cellUi === cellImgs.cell) {
                entity.cellUi = cellImgs.flag;
            } else if (entity.cellUi === cellImgs.flag) {
                entity.cellUi = cellImgs.question;
            } else if (entity.cellUi === cellImgs.question) {
                entity.cellUi = cellImgs.cell;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state) => {
                setInitialBoardState(state);
            })
            .addCase(looseGame, (state, { payload }) => {
                openBombs(state);
                state.entities[payload].cellUi = bombs.explode;
            });
    },
});

export const selectors = cellsAdapter.getSelectors((state) => state.boardState);
export const { setCells, setClicked, setClick, toggleFlag } =
    cellsSlice.actions;
export default cellsSlice.reducer;
