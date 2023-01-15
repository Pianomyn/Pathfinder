import { CellId, CellTypeColorMapping } from "../types";
import { useEffect, useState } from "react";

export default function Cell(
  id: CellId,
  cellType: CellTypeColorMapping,
  neighbourIds: CellId[],
  previouslyVisitedId: CellId,
  weight: number,
  heuristic: number
) {
  useEffect(() => {});

  return <div></div>;
}
