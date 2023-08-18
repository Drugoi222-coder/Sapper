import {
    createSlice,
    createEntityAdapter,
    nanoid,
    PayloadAction,
} from "@reduxjs/toolkit";
import { looseGame, startGame } from "../window/windowSlice";
import {
    generateMines,
    openBombs,
    openCells,
    setInitialBoardState,
} from "../../utils/utils";
import images from "../images/images";
import { COUNT_COLUMNS, COUNT_ROWS } from "../../ts/constants";
import { ICell, IState } from "../../ts/interfaces";
const { cells: cellImgs, bombs } = images;

const cellsAdapter = createEntityAdapter<ICell>();
const initialState = cellsAdapter.getInitialState({
    rows: COUNT_ROWS,
    columns: COUNT_COLUMNS,
    minesSet: [] as string[],
    openedCells: [] as string[],
    isClicked: false,
});

const cellsSlice = createSlice({
    name: "boardState",
    initialState,
    reducers: {
        setCells: (state) => {
            const cells: ICell[] = [];
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
        setClick: (state, { payload }: PayloadAction<string>) => {
            const cell = state.entities[payload];
            if (!state.isClicked) {
                generateMines(payload, state);
                state.isClicked = true;
            }
            if (cell && cell.cellUi === cellImgs.cell) {
                openCells(payload, state);
            }
        },
        toggleFlag: (state, { payload }) => {
            const { id } = payload;
            const entity = state.entities[id];
            if (entity && entity.cellUi === cellImgs.cell) {
                entity.cellUi = cellImgs.flag;
            } else if (entity && entity.cellUi === cellImgs.flag) {
                entity.cellUi = cellImgs.question;
            } else if (entity && entity.cellUi === cellImgs.question) {
                entity.cellUi = cellImgs.cell;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(startGame, (state) => {
                setInitialBoardState(state);
            })
            .addCase(looseGame, (state, { payload }: PayloadAction<string>) => {
                openBombs(state);
                const entity = state.entities[payload];
                if (entity) {
                    entity.cellUi = bombs.explode;
                }
            });
    },
});

export const selectors = cellsAdapter.getSelectors<IState>(
    (state) => state.boardState
);
export const { setCells, setClick, toggleFlag } = cellsSlice.actions;
export default cellsSlice.reducer;
