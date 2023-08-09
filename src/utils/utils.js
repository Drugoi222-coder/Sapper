export const getFlatIndex = (row, column) => row * 16 + column;

export const getAroundIds = (entityId, entitiesObj) => {
    const { row, column } = entitiesObj[entityId];
    return Object.values(entitiesObj)
        .map((item) => {
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
                return item.id;
            }
        })
        .filter((item) => item);
};
