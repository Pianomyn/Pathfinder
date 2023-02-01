import Algorithm from "./AlgorithmTemplate";
import { CellId } from "../Utility/types";

interface BFSProps {
  gridHeight: number;
  gridWidth: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
}

export default class BFS implements Algorithm {
  gridHeight: number;
  gridWidth: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  // Previously visited
  // Weight
  // Heuristic

  constructor(
    gridHeight: number,
    gridWidth: number,
    sourceCellId: CellId | null,
    targetCellId: CellId | null
  ) {
    this.gridHeight = gridHeight;
    this.gridWidth = gridWidth;
    this.sourceCellId = sourceCellId;
    this.targetCellId = targetCellId;
    console.log(gridHeight);
  }
  returnShortestPath() {}
  findShortestPath() {}
}
