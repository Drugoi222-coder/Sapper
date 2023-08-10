import { createSlice, createEntityAdapter, nanoid } from "@reduxjs/toolkit";
import { looseGame, startGame } from "../window/windowSlice";
import { getAroundIds, getFlatIndex } from "../../utils/utils";
import images from "../images/images";
import { COUNT_COLUMNS, COUNT_MINES, COUNT_ROWS } from "../../utils/constants";
const { cells: cellImgs, bombs, bombCount } = images;

const cellsAdapter = createEntityAdapter();
const initialState = cellsAdapter.getInitialState({
    rows: COUNT_ROWS,
    columns: COUNT_COLUMNS,
    minesSet: [],
    openedCells: [],
    isClicked: false,
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
                        isMine: false,
                        cellUi: cellImgs.cell,
                        flatIndex: getFlatIndex(rowIndex, columnIndex),
                    });
                }
            }
            cellsAdapter.setAll(state, cells);
        },
        setClick: (state, { payload }) => {
            if (!state.isClicked) {
                const usedIndexes = new Set();
                const startIndexes = new Set(
                    [payload, ...getAroundIds(payload, state.entities)].map(
                        (item) => state.entities[item].flatIndex
                    )
                );
                const entities = Object.values(state.entities);
                while (usedIndexes.size < COUNT_MINES) {
                    const mineIndex = Math.floor(
                        Math.random() * state.ids.length
                    );
                    entities.find((item) => {
                        if (
                            item.flatIndex === mineIndex &&
                            !startIndexes.has(mineIndex)
                        ) {
                            state.entities[item.id].isMine = true;
                            usedIndexes.add(item.id);
                        }
                    });
                }
                state.minesSet = Array.from(usedIndexes);
                state.isClicked = true;
            }
            if (state.entities[payload].cellUi === cellImgs.cell) {
                const openCells = (id, entities) => {
                    const entity = state.entities[id];
                    if (
                        !state.openedCells.find((item) => item === id) &&
                        entity.cellUi !== cellImgs.flag
                    ) {
                        state.openedCells.push(id);
                        let counter = 0;
                        const idsAround = getAroundIds(id, entities);
                        idsAround.forEach((id) => {
                            if (state.minesSet.find((item) => item === id)) {
                                counter++;
                            }
                        });
                        if (counter > 0) {
                            entity.cellUi = bombCount[counter - 1];
                        } else {
                            idsAround.forEach((id) => openCells(id, entities));
                            entity.cellUi = cellImgs.emptycell;
                        }
                    }
                };
                openCells(payload, state.entities);
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
                state.ids.forEach((item) => {
                    state.entities[item].cellUi = cellImgs.cell;
                });
                state.minesSet.forEach((item) => {
                    state.entities[item].isMine = false;
                });
                state.minesSet = [];
                state.openedCells = [];
                state.isClicked = false;
            })
            .addCase(looseGame, (state, { payload }) => {
                state.ids.forEach((item) => {
                    const entity = state.entities[item];
                    if (entity.isMine && entity.cellUi === cellImgs.cell) {
                        entity.cellUi = bombs.bombOpened;
                    } else if (
                        !entity.isMine &&
                        entity.cellUi === cellImgs.flag
                    ) {
                        entity.cellUi = bombs.wrong;
                    }
                });
                state.entities[payload].cellUi = bombs.explode;
            });
    },
});

export const selectors = cellsAdapter.getSelectors((state) => state.boardState);
export const { setCells, setClicked, setClick, toggleFlag } =
    cellsSlice.actions;
export default cellsSlice.reducer;
