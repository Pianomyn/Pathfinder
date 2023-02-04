import "./Grid.css";

import Cell from "./Cell";
import {
  CellId,
  PlaceableColorMapping,
  AllColorMapping,
} from "../Utility/types";
import React, { useEffect, useState } from "react";
import Graph from "../Algorithms/Graph/Graph";

interface GridProps {
  graph: Graph;
  height: number;
  width: number;
  currentCellToPlace: PlaceableColorMapping | null;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;
}

export default function Grid({
  graph,
  height,
  width,
  currentCellToPlace,
  sourceCellId,
  targetCellId,
  setSourceCellId,
  setTargetCellId,
}: GridProps) {
  const [mouseDown, setMouseDown] = useState<boolean>(false);
  console.log(graph);
  var cell = document.getElementById("3-2");
  if (cell) {
    //cell.classList.remove(AllColorMapping.Unvisited);
    //cell.classList.add(AllColorMapping.Wall);
  }

  function generateRow(width: number, h: number) {
    var cells: Cell[] = [];
    for (var w = 0; w < width; w++) {
      cells.push(
        <Cell
          key={`${w}-${h}`}
          graph={graph}
          cellId={{ width: w, height: h }}
          mouseDown={mouseDown}
          currentCellToPlace={currentCellToPlace}
          sourceCellId={sourceCellId}
          targetCellId={targetCellId}
          setSourceCellId={setSourceCellId}
          setTargetCellId={setTargetCellId}
          height={height}
          width={width}
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
}
