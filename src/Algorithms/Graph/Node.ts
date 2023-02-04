import { AllColorMapping, CellId } from "../../Utility/types";

export default class Node {
  cellId: CellId;
  weight: number;
  isVisited: boolean;
  cellType: AllColorMapping;
  previouslyVisitedCellId: CellId | null;
  // previously visited id

  constructor(cellId: CellId) {
    this.cellId = cellId;
    this.weight = 1;
    this.isVisited = false;
    this.cellType = AllColorMapping.Unvisited;
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

  // Setters
  setWeight(weight: number): void {
    this.weight = weight;
  }
  setCellType(newNodeType: AllColorMapping) {
    this.cellType = newNodeType;
  }
  setIsVisited(isVisited: boolean) {
    this.isVisited = isVisited;
  }
  setPreviouslyVisitedCellId(cellId: CellId) {
    this.previouslyVisitedCellId = cellId;
  }
}
