import "./Cell.css";

import {
    ALL_COLOR_MAPPINGS_TYPE,
  CellId,
} from "../Utility/types";
import React, { useEffect, useState } from "react";
import Graph from "../Algorithms/Graph/Graph";
import { ALL_COLOR_MAPPINGS, PLACEABLE_COLOR_MAPPINGS } from "../Utility/constants";

type CellProps = {
  graph: Graph;
  cellId: CellId;
  mouseDown: boolean;
  currentCellToPlace: typeof PLACEABLE_COLOR_MAPPINGS | null;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;
  height: number;
  width: number;
};

function cellIdIsEqual(cellId: CellId, otherCellId: CellId) {
  return JSON.stringify(cellId) === JSON.stringify(otherCellId)
}

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
  const [cellColor, setCellColor] = useState<ALL_COLOR_MAPPINGS_TYPE>(
    ALL_COLOR_MAPPINGS.Unvisited
  );
  useEffect(() => {
    setCellColor(ALL_COLOR_MAPPINGS.Unvisited);
    setSourceCellId(null);
    setTargetCellId(null);
  }, [height, width]);

  var cellTypeAsString =
    currentCellToPlace as string as keyof typeof PLACEABLE_COLOR_MAPPINGS;

  // Unreadable :/ need to refactor.
  return (
    <td
      id={JSON.stringify(cellId)}
      className={`cell ${cellColor} ${
        cellId === sourceCellId ? PLACEABLE_COLOR_MAPPINGS.Source : ""
      } ${cellId === targetCellId ? PLACEABLE_COLOR_MAPPINGS.Target : ""}`}
      onMouseOver={() => {
        if (
          mouseDown &&
          currentCellToPlace &&
          (PLACEABLE_COLOR_MAPPINGS[cellTypeAsString] ==
            PLACEABLE_COLOR_MAPPINGS.Wall ||
            PLACEABLE_COLOR_MAPPINGS[cellTypeAsString] ==
              PLACEABLE_COLOR_MAPPINGS.Weight)
        ) {
          if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
            graph.updateTargetCellId(null);
            setTargetCellId(null);
          }
          if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
            graph.updateSourceCellId(null);
            setSourceCellId(null);
          }

          graph
            .getNode(cellId)
            .setCellType(PLACEABLE_COLOR_MAPPINGS[cellTypeAsString]);
          setCellColor(PLACEABLE_COLOR_MAPPINGS[cellTypeAsString]);
        }
      }}
      onClick={() => {
        /*
        if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
          graph.updateTargetCellId(null);
          setTargetCellId(null);
          console.log("reached2")
        }
        if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
          console.log("reached3")
          graph.updateSourceCellId(null);
          setSourceCellId(null);
        }
        */

        if (
          PLACEABLE_COLOR_MAPPINGS[cellTypeAsString] ==
          PLACEABLE_COLOR_MAPPINGS.Source
        ) {
          setCellColor(PLACEABLE_COLOR_MAPPINGS[cellTypeAsString]);
          setSourceCellId(cellId);
          graph.updateSourceCellId(cellId);
        } else if (
          ALL_COLOR_MAPPINGS[cellTypeAsString] == PLACEABLE_COLOR_MAPPINGS.Target
        ) {
          setCellColor(PLACEABLE_COLOR_MAPPINGS[cellTypeAsString]);
          setTargetCellId(cellId);
          graph.updateTargetCellId(cellId);
        } else {
          const newCellType =
            PLACEABLE_COLOR_MAPPINGS[cellTypeAsString] === cellColor
              ? ALL_COLOR_MAPPINGS.Unvisited
              : PLACEABLE_COLOR_MAPPINGS[cellTypeAsString];
          setCellColor(newCellType);
        }
        graph
          .getNode(cellId)
          .setCellType(PLACEABLE_COLOR_MAPPINGS[cellTypeAsString]);
      }}
    />
  );
}

type Cell = ReturnType<typeof Cell>;

export default Cell;
