import { CellId } from "../Utility/types";

export default interface Algorithm {
  gridHeight: number;
  gridWidth: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;

  returnShortestPath: () => void;
  findShortestPath: () => void;
}
