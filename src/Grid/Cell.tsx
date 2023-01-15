import "./Cell.css";

import { CellId, CellColorMapping } from "../types";
import React, { useEffect, useState } from "react";

type CellProps = {
  id: CellId;
  cellTypeColor?: CellColorMapping;
  neighbourIds?: CellId[];
  previouslyVisitedId?: CellId | {};
  weight?: number;
  heuristic?: number;
};

function Cell({
  id,
  cellTypeColor = CellColorMapping.UNVISITED,
  neighbourIds = [],
  previouslyVisitedId = {},
  weight = 1,
  heuristic = 0,
}: CellProps) {
  return <td className={`cell ${cellTypeColor}`} />;
}

type Cell = ReturnType<typeof Cell>;

export default Cell;
