import "./row.css";
import Cell from "../cell/cell";
import { useSelector } from "react-redux";
import { selectors } from "../cell/cellsSlice";

const Row = ({ rowIndex }) => {
    const cells = useSelector(selectors.selectAll);

    const renderCells = () => {
        return cells.map((item) => {
            if (item.row === rowIndex) {
                return <Cell id={item.id} key={item.id} />;
            }
        });
    };

    return <div className="row">{renderCells()}</div>;
};

export default Row;
