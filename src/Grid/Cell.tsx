import "./Cell.css";

import { CellId, AllColorMapping, PlaceableColorMapping } from "../types";
import React, { useEffect, useState } from "react";

type CellProps = {
  cellId: CellId;
  mouseDown: boolean;
  currentCellToPlace: PlaceableColorMapping | null;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  setSourceCellId: (value: CellId | null) => void;
  setTargetCellId: (value: CellId | null) => void;
  neighbourIds?: CellId[];
  previouslyVisitedId?: CellId | {};
  weight?: number;
  heuristic?: number;
};

function Cell({
  cellId,
  mouseDown,
  currentCellToPlace,
  sourceCellId,
  targetCellId,
  setSourceCellId,
  setTargetCellId,
  neighbourIds = [],
  previouslyVisitedId = {},
  weight = 1,
  heuristic = 0,
}: CellProps) {
  const [cellColor, setCellColor] = useState<AllColorMapping>(
    AllColorMapping.Unvisited
  );

  return (
    <td
      onMouseOver={() => {
        if (
          mouseDown &&
          currentCellToPlace &&
          (PlaceableColorMapping[
            currentCellToPlace as string as keyof typeof PlaceableColorMapping
          ] == PlaceableColorMapping.Wall ||
            PlaceableColorMapping[
              currentCellToPlace as string as keyof typeof PlaceableColorMapping
            ] == PlaceableColorMapping.Weight)
        ) {
          setCellColor(
            PlaceableColorMapping[
              currentCellToPlace as string as keyof typeof PlaceableColorMapping
            ]
          );
        }
      }}
      className={`cell ${cellColor} ${
        cellId === sourceCellId ? PlaceableColorMapping.Source : ""
      } ${cellId === targetCellId ? PlaceableColorMapping.Target : ""}`}
      onClick={() => {
        if (
          !currentCellToPlace ||
          cellColor ===
            PlaceableColorMapping[
              currentCellToPlace as string as keyof typeof PlaceableColorMapping
            ]
        ) {
          if (cellColor == PlaceableColorMapping.Source) setSourceCellId(null);
          if (cellColor == PlaceableColorMapping.Target) setTargetCellId(null);
          setCellColor(AllColorMapping.Unvisited);
        } else if (
          PlaceableColorMapping[
            currentCellToPlace as string as keyof typeof PlaceableColorMapping
          ] == PlaceableColorMapping.Source
        ) {
          if (sourceCellId) return;
          setCellColor(
            PlaceableColorMapping[
              currentCellToPlace as string as keyof typeof PlaceableColorMapping
            ]
          );
          setSourceCellId(cellId);
        } else if (
          AllColorMapping[
            currentCellToPlace as string as keyof typeof PlaceableColorMapping
          ] == PlaceableColorMapping.Target
        ) {
          if (targetCellId) return;
          setCellColor(
            PlaceableColorMapping[
              currentCellToPlace as string as keyof typeof PlaceableColorMapping
            ]
          );
          setTargetCellId(cellId);
        } else {
          const newCellType =
            currentCellToPlace === cellColor
              ? AllColorMapping.Unvisited
              : PlaceableColorMapping[
                  currentCellToPlace as string as keyof typeof PlaceableColorMapping
                ];
          setCellColor(newCellType);
        }
      }}
    />
  );
}

type Cell = ReturnType<typeof Cell>;

export default Cell;
