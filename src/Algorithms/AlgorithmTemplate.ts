import { CellId } from "../Utility/types";

export default interface Algorithm {
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;

  returnShortestPath: () => void;
  findShortestPath: () => void;
}
