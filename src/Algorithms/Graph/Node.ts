import { CellId } from "../../Utility/types";

export default class Node {
  #cellId: CellId;
  #isVisited: boolean;
  #isWeight: boolean;
  #isWall: boolean;
  #previouslyVisitedCellId: CellId | null;

  constructor(cellId: CellId) {
    this.#cellId = cellId;
    this.#isVisited = false;
    this.#isWeight = false;
    this.#isWall = false;
    this.#previouslyVisitedCellId = null;
  }

  // Getters
  getCellId() {
    return this.#cellId;
  }

  getIsWeight() {
    return this.#isWeight;
  }

  getIsVisited() {
    return this.#isVisited;
  }

  getIsWall() {
    return this.#isWall;
  }

  getCellY() {
    return this.#cellId.y;
  }

  getCellX() {
    return this.#cellId.x;
  }

  getPreviouslyVisitedCellId() {
    return this.#previouslyVisitedCellId;
  }

  // Setters
  setIsWeight(isWeight: boolean): void {
    this.#isWeight = isWeight
  }

  setIsVisited(isVisited: boolean) {
    this.#isVisited = isVisited;
  }

  setIsWall(isWall: boolean) {
    return this.#isWall = isWall;
  }

  setPreviouslyVisitedCellId(cellId: CellId | null) {
    this.#previouslyVisitedCellId = cellId;
  }
}
