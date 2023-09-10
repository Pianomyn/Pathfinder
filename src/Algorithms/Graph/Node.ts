import { ALL_COLOR_MAPPINGS } from "../../Utility/constants";
import { ALL_COLOR_MAPPINGS_TYPE, CellId } from "../../Utility/types";

export default class Node {
  cellId: CellId;
  weight: number;
  isVisited: boolean;
  cellType: ALL_COLOR_MAPPINGS_TYPE;
  previouslyVisitedCellId: CellId | null;
  // previously visited id

  constructor(cellId: CellId) {
    this.cellId = cellId;
    this.weight = 1;
    this.isVisited = false;
    this.cellType = ALL_COLOR_MAPPINGS.Unvisited;
    this.previouslyVisitedCellId = null;
  }

  // Getters
  getCellId() {
    return this.cellId;
  }

  getIsVisited() {
    return this.isVisited;
  }

  getCellY() {
    return this.cellId.y;
  }

  getCellX() {
    return this.cellId.x;
  }

  getCellType() {
    return this.cellType;
  }

  getPreviouslyVisitedCellId() {
    return this.previouslyVisitedCellId;
  }

  // Setters
  setWeight(weight: number): void {
    this.weight = weight;
  }
  setCellType(newNodeType: ALL_COLOR_MAPPINGS_TYPE) {
    this.cellType = newNodeType;
  }
  setIsVisited(isVisited: boolean) {
    this.isVisited = isVisited;
  }
  setPreviouslyVisitedCellId(cellId: CellId | null) {
    this.previouslyVisitedCellId = cellId;
  }
}
