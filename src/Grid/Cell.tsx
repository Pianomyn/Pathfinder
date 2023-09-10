import "./Cell.css";

import {
    ALL_COLOR_MAPPINGS_TYPE,
  CellId,
  PLACEABLE_COLOR_MAPPINGS_TYPE,
} from "../Utility/types";
import React, { useEffect, useState } from "react";
import Graph from "../Algorithms/Graph/Graph";
import { ALL_COLOR_MAPPINGS, PLACEABLE_COLOR_MAPPINGS } from "../Utility/constants";
import { cellIdIsEqual } from "../Utility/CellId";

type CellProps = {
  graph: Graph;
  cellId: CellId;
  mouseDown: boolean;
  currentCellToPlace:  PLACEABLE_COLOR_MAPPINGS_TYPE | null;
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
  const [cellColor, setCellColor] = useState<ALL_COLOR_MAPPINGS_TYPE>(
    ALL_COLOR_MAPPINGS.Unvisited
  );
  const [previousSourceCellId, setPreviousSourceCellId] = useState<CellId | null>(
  null
  );
  const [previousTargetCellId, setPreviousTargetCellId] = useState<CellId | null>(
  null
  );
  useEffect(() => {
    setCellColor(ALL_COLOR_MAPPINGS.Unvisited);
    setSourceCellId(null);
    setTargetCellId(null);
  }, [height, width]);

  useEffect(()=> {
    if (previousSourceCellId && cellIdIsEqual(cellId, previousSourceCellId)) {
      setCellColor(ALL_COLOR_MAPPINGS.Unvisited)
      graph.getNode(cellId).setCellType(ALL_COLOR_MAPPINGS.Unvisited)
    }
    setPreviousSourceCellId(sourceCellId)
  }, [sourceCellId])

  useEffect(()=> {
    if (previousTargetCellId && cellIdIsEqual(cellId, previousTargetCellId)) {
      setCellColor(ALL_COLOR_MAPPINGS.Unvisited)
      graph.getNode(cellId).setCellType(ALL_COLOR_MAPPINGS.Unvisited)
    }
    setPreviousTargetCellId(targetCellId)
  }, [targetCellId])

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
          console.log("REACHED")
          setCellColor(ALL_COLOR_MAPPINGS.Source)
          setSourceCellId(cellId);
          graph.updateSourceCellId(cellId);
        } else if (
          ALL_COLOR_MAPPINGS[cellTypeAsString] == PLACEABLE_COLOR_MAPPINGS.Target
        ) {
          setCellColor(ALL_COLOR_MAPPINGS.Target)
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