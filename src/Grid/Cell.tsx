import "./Cell.css";

import {
  CellId,
  AllColorMapping,
  PlaceableColorMapping,
} from "../Utility/types";
import React, { useEffect, useState } from "react";
import Graph from "../Algorithms/Graph/Graph";

type CellProps = {
  graph: Graph;
  cellId: CellId;
  mouseDown: boolean;
  currentCellToPlace: PlaceableColorMapping | null;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;
  height: number;
  width: number;
};

function Cell({
  graph,
  cellId,
  mouseDown,
  currentCellToPlace,
  sourceCellId,
  targetCellId,
  setSourceCellId,
  setTargetCellId,
  height,
  width,
}: CellProps) {
  const [cellColor, setCellColor] = useState<AllColorMapping>(
    AllColorMapping.Unvisited
  );
  useEffect(() => {
    setCellColor(AllColorMapping.Unvisited);
    setSourceCellId(null);
    setTargetCellId(null);
  }, [height, width]);

  var cellTypeAsString =
    currentCellToPlace as string as keyof typeof PlaceableColorMapping;

  // Unreadable :/ need to refactor.
  return (
    <td
      id={`${cellId.y}-${cellId.x}`}
      className={`cell ${cellColor} ${
        cellId === sourceCellId ? PlaceableColorMapping.Source : ""
      } ${cellId === targetCellId ? PlaceableColorMapping.Target : ""}`}
      onMouseOver={() => {
        if (
          mouseDown &&
          currentCellToPlace &&
          (PlaceableColorMapping[cellTypeAsString] ==
            PlaceableColorMapping.Wall ||
            PlaceableColorMapping[cellTypeAsString] ==
              PlaceableColorMapping.Weight)
        ) {
          if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
            setTargetCellId(null);
          }
          if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
            setSourceCellId(null);
          }

          graph
            .getNode(cellId)
            .setCellType(PlaceableColorMapping[cellTypeAsString]);
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
        }
      }}
      onClick={() => {
        if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
          graph.setTargetCellId(null);
          setTargetCellId(null);
        }
        if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
          graph.setSourceCellId(null);
          setSourceCellId(null);
        }
        if (
          !currentCellToPlace ||
          cellColor === PlaceableColorMapping[cellTypeAsString]
        ) {
          if (cellColor == PlaceableColorMapping.Source) {
            graph.setSourceCellId(null);
            setSourceCellId(null);
          }
          if (cellColor == PlaceableColorMapping.Target) {
            graph.setTargetCellId(null);
            setTargetCellId(null);
          }
          setCellColor(AllColorMapping.Unvisited);
        } else if (
          PlaceableColorMapping[cellTypeAsString] ==
          PlaceableColorMapping.Source
        ) {
          if (sourceCellId) return;
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
          setSourceCellId(cellId);
          graph.setSourceCellId(cellId);
        } else if (
          AllColorMapping[cellTypeAsString] == PlaceableColorMapping.Target
        ) {
          if (targetCellId) return;
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
          setTargetCellId(cellId);
          graph.setTargetCellId(cellId);
        } else {
          const newCellType =
            currentCellToPlace === cellColor
              ? AllColorMapping.Unvisited
              : PlaceableColorMapping[cellTypeAsString];
          setCellColor(newCellType);
        }
        graph
          .getNode(cellId)
          .setCellType(PlaceableColorMapping[cellTypeAsString]);
        console.log(graph.getNode(cellId));
      }}
    />
  );
}

type Cell = ReturnType<typeof Cell>;

export default Cell;
