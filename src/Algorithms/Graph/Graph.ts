import { AllColorMapping, CellId } from "../../Utility/types";
import { VISITABLE_CELL_TYPES } from "../../Utility/constants";
import Node from "./Node";

export default class Graph {
  height: number;
  width: number;
  sourceCellId: CellId | null;
  targetCellId: CellId | null;
  graph: Node[][];

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
    this.graph = this.generateGraph(height, width);
  }

  // Getters
  getGraphHeight() {
    return this.height;
  }

  getGraphWidth() {
    return this.width;
  }

  getSourceCellId(): CellId | null {
    return this.sourceCellId;
  }

  getTargetCellId(): CellId | null {
    return this.targetCellId;
  }

  getNode(cellId: CellId): Node {
    // Assumes x and y are valid
    const { y, x } = cellId;
    //console.log("X AND Y", y, x);
    return this.graph[y][x];
  }

  getCell(cellId: CellId) {
    // Get HTML cell
    const cellIdString = `${cellId.y}-${cellId.x}`;
    return document.getElementById(cellIdString);
  }

  updateCellColor(cellId: CellId, newColor: AllColorMapping) {
    var cell = this.getCell(cellId);
    if (cell) {
      for (let element of cell.classList) {
        // @ts-ignore TODO: Fix typecasting
        if (VISITABLE_CELL_TYPES.includes(element)) {
          cell.classList.remove(element);
        }
      }
      cell.classList.add(newColor);
    }
  }

  // Setters
  setSourceCellId(cellId: CellId | null) {
    this.sourceCellId = cellId;
  }

  setTargetCellId(cellId: CellId | null) {
    this.targetCellId = cellId;
  }

  generateGraph(height: number, width: number): Node[][] {
    var graph: Node[][] = [];
    for (var y = 0; y < height; y++) {
      var row: Node[] = [];
      for (var x = 0; x < width; x++) {
        // Check if source or target node
        var newNode = new Node({ y: y, x: x });
        if (
          this.sourceCellId &&
          this.sourceCellId.y === y &&
          this.sourceCellId.x === x
        ) {
          //newNode.isSource = true;
        } else if (
          this.targetCellId &&
          this.targetCellId.y === y &&
          this.targetCellId.x === x
        ) {
          //newNode.isTarget = true;
        }
        row.push(newNode);
      }
      graph.push(row);
    }
    return graph;
  }
}
