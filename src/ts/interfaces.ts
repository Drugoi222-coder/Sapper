import { Stages } from "./constants";
import { EntityState } from "@reduxjs/toolkit";

export interface ICell {
    id: string;
    row: number;
    column: number;
    cellUi: string;
    isMine?: boolean;
}

export interface IBoardState extends EntityState<ICell> {
    rows: number;
    columns: number;
    minesSet: string[];
    openedCells: string[];
    isClicked: boolean;
}

export interface IWindowState {
    stage: Stages;
    flagsCount: number;
    smileImg: string;
}

export interface IState {
    boardState: IBoardState;
    windowState: IWindowState;
}
