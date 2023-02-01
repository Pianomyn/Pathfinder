import Algorithm from "./AlgorithmTemplate";
import { CellId } from "../Utility/types";

export default class BFS implements Algorithm {
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  // Previously visited
  // Weight
  // Heuristic

  constructor(
    height: number,
    width: number,
    sourceCellId: CellId | null,
    targetCellId: CellId | null
  ) {
    this.height = height;
    this.width = width;
    this.sourceCellId = sourceCellId;
    this.targetCellId = targetCellId;
    console.log(height);
  }
  returnShortestPath() {}
  findShortestPath() {}
}
