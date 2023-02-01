import "./Grid.css";
import BFS from "../Algorithms/BFS";

import Cell from "./Cell";
import { CellId, PlaceableColorMapping } from "../Utility/types";
import React, { useState } from "react";

interface GridProps {
  height: number;
  width: number;
  currentCellToPlace: PlaceableColorMapping | null;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;
}

const Grid = ({
  height,
  width,
  currentCellToPlace,
  sourceCellId,
  targetCellId,
  setSourceCellId,
  setTargetCellId,
}: GridProps) => {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  var bfs = new BFS(height, width, sourceCellId, targetCellId);

  function generateRow(width: number, h: number) {
    var cells: Cell[] = [];
    for (var w = 0; w < width; w++) {
      cells.push(
        <Cell
          key={`${w}-${h}`}
          cellId={{ width: w, height: h }}
          mouseDown={mouseDown}
          currentCellToPlace={currentCellToPlace}
          sourceCellId={sourceCellId}
          targetCellId={targetCellId}
          setSourceCellId={setSourceCellId}
          setTargetCellId={setTargetCellId}
        />
      );
    }
    return <tr key={`${h}`}>{cells}</tr>;
  }

  function generateTable(height: number, width: number) {
    var rows: JSX.Element[] = [];
    for (var h = 0; h < height; h++) {
      //var row = <tr id={`grid-row-${h}`}></tr>;
      var currentRow = generateRow(width, h);
      rows.push(currentRow);
    }
    return (
      <table
        className="grid hover:cursor-pointer"
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
      >
        <tbody>{rows}</tbody>
      </table>
    );
  }
  return <>{generateTable(height, width)}</>;
};

export default Grid;
