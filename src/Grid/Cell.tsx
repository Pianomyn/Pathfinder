import "./Cell.css";

import {
  CellId,
  AllColorMapping,
  PlaceableColorMapping,
} from "../Utility/types";
import React, { useEffect, useState } from "react";

type CellProps = {
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

  // Instant legacy code :/ need to refactor.
  return (
    <td
      onMouseOver={() => {
        if (
          mouseDown &&
          currentCellToPlace &&
          (PlaceableColorMapping[cellTypeAsString] ==
            PlaceableColorMapping.Wall ||
            PlaceableColorMapping[cellTypeAsString] ==
              PlaceableColorMapping.Weight)
        ) {
          console.log(sourceCellId);
          console.log(cellId);
          if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
            setTargetCellId(null);
          }
          if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
            setSourceCellId(null);
          }
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
        }
      }}
      className={`cell ${cellColor} ${
        cellId === sourceCellId ? PlaceableColorMapping.Source : ""
      } ${cellId === targetCellId ? PlaceableColorMapping.Target : ""}`}
      onClick={() => {
        if (JSON.stringify(targetCellId) === JSON.stringify(cellId)) {
          setTargetCellId(null);
        }
        if (JSON.stringify(sourceCellId) === JSON.stringify(cellId)) {
          setSourceCellId(null);
        }
        if (
          !currentCellToPlace ||
          cellColor === PlaceableColorMapping[cellTypeAsString]
        ) {
          if (cellColor == PlaceableColorMapping.Source) setSourceCellId(null);
          if (cellColor == PlaceableColorMapping.Target) setTargetCellId(null);
          setCellColor(AllColorMapping.Unvisited);
        } else if (
          PlaceableColorMapping[cellTypeAsString] ==
          PlaceableColorMapping.Source
        ) {
          if (sourceCellId) return;
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
          setSourceCellId(cellId);
        } else if (
          AllColorMapping[cellTypeAsString] == PlaceableColorMapping.Target
        ) {
          if (targetCellId) return;
          setCellColor(PlaceableColorMapping[cellTypeAsString]);
          setTargetCellId(cellId);
        } else {
          const newCellType =
            currentCellToPlace === cellColor
              ? AllColorMapping.Unvisited
              : PlaceableColorMapping[cellTypeAsString];
          setCellColor(newCellType);
        }
      }}
    />
  );
}

type Cell = ReturnType<typeof Cell>;

export default Cell;
