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
  findShortestPath() {
    if (!this.sourceCellId || !this.targetCellId) return;

    var expanded = [];
    var fringe = [];
    const source = document.getElementById(
      `${this.sourceCellId.height}-${this.sourceCellId.width}`
    );
    console.log(source);
    fringe.push(source);

    expanded.push();
  }
}
