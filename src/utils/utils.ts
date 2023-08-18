import images from "../components/images/images";
import { COUNT_MINES } from "../ts/constants";
import { IBoardState, ICell } from "../ts/interfaces";

const { cells: cellImgs, bombCount, bombs } = images;

export const getFlatIndex = (item: ICell) => item.row * 16 + item.column;

// Получить id клеток вокруг данной клетки
export const getAroundIds = (
    entityId: string,
    entitiesObj: IBoardState["entities"]
) => {
    const entity = entitiesObj[entityId];
    let row: number;
    let column: number;

    if (entity) {
        row = entity.row;
        column = entity.column;
    }

    return Object.values(entitiesObj)
        .filter((item) => {
            if (item) {
                if (
                    (row - 1 === item.row && column - 1 === item.column) ||
                    (row - 1 === item.row && column === item.column) ||
                    (row - 1 === item.row && column + 1 === item.column) ||
                    (row === item.row && column - 1 === item.column) ||
                    (row === item.row && column + 1 === item.column) ||
                    (row + 1 === item.row && column - 1 === item.column) ||
                    (row + 1 === item.row && column === item.column) ||
                    (row + 1 === item.row && column + 1 === item.column)
                ) {
                    return item;
                }
            }
        })
        .map((item) => item?.id)
        .concat(entityId);
};

export const openCells = (id: string, sliceState: IBoardState) => {
    const entity = sliceState.entities[id];

    if (entity) {
        if (
            !sliceState.openedCells.find((item) => item === id) &&
            entity.cellUi !== cellImgs.flag
        ) {
            let counter = 0;
            const idsAround = getAroundIds(id, sliceState.entities);

            sliceState.openedCells.push(id);
            idsAround.forEach((id) => {
                if (sliceState.minesSet.find((item) => item === id)) {
                    counter++;
                }
            });

            if (counter > 0) {
                entity.cellUi = bombCount[counter - 1];
            } else {
                idsAround.forEach((id) => {
                    if (id) {
                        openCells(id, sliceState);
                    }
                });
                entity.cellUi = cellImgs.emptycell;
            }
        }
    }
};

export const generateMines = (id: string, sliceState: IBoardState) => {
    const { entities: entitiesObj } = sliceState;
    const entities = Object.values(entitiesObj);
    const startIndexes = new Set(
        getAroundIds(id, entitiesObj).map((item) => {
            if (item) {
                const entity = entitiesObj[item];
                if (entity) {
                    return getFlatIndex(entity);
                }
            }
        })
    );
    const usedIndexes = new Set<string>();

    while (usedIndexes.size < COUNT_MINES) {
        const mineIndex = Math.floor(Math.random() * sliceState.ids.length);

        entities.find((item) => {
            if (
                item &&
                getFlatIndex(item) === mineIndex &&
                !startIndexes.has(mineIndex)
            ) {
                item.isMine = true;
                usedIndexes.add(item.id);
            }
        });
    }

    sliceState.minesSet = Array.from(usedIndexes);
};

export const openBombs = (sliceState: IBoardState) => {
    sliceState.ids.forEach((item) => {
        const entity = sliceState.entities[item];

        if (entity) {
            if (entity.isMine && entity.cellUi === cellImgs.cell) {
                entity.cellUi = bombs.bombOpened;
            } else if (!entity.isMine && entity.cellUi === cellImgs.flag) {
                entity.cellUi = bombs.wrong;
            }
        }
    });
};

export const setInitialBoardState = (sliceState: IBoardState) => {
    sliceState.openedCells = [];
    sliceState.isClicked = false;

    sliceState.ids.forEach((item) => {
        const entity = sliceState.entities[item];
        if (entity) {
            entity.cellUi = cellImgs.cell;
        }
    });

    sliceState.minesSet.forEach((item) => {
        const entity = sliceState.entities[item];
        if (entity) {
            entity.isMine = false;
        }
    });

    sliceState.minesSet = [];
};
