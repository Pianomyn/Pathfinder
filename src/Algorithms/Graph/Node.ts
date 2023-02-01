import { CellId } from "../../Utility/types";

export default class Node {
  weight: number;
  isSource: boolean;
  isTarget: boolean;
  isWall: boolean;
  previouslyVisitedCellId: CellId | null;
  // previously visited id

  constructor() {
    this.weight = 1;
    this.isSource = false;
    this.isTarget = false;
    this.isWall = false;
    this.previouslyVisitedCellId = null;
  }

  // Setters
  setWeight(weight: number): void {
    this.weight = weight;
  }

  // Getters
}
