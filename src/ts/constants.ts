export enum Stages {
    start = "start",
    win = "win",
    loose = "loose",
}

export const COUNT_COLUMNS = 16;
export const COUNT_ROWS = 16;
export const COUNT_MINES = 40;
export const COUNT_OPEN_TO_WIN = COUNT_COLUMNS * COUNT_ROWS - COUNT_MINES - 1;
